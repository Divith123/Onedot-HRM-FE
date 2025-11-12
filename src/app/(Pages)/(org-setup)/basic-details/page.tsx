'use client';

import Image from 'next/image';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PageTransition from '@/components/animations/PageTransition';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { ProtectedLayout } from '@/components/auth/ProtectedLayout';

// Lazy load ReactCrop component
const ReactCrop = dynamic(() => import('react-image-crop').then(mod => ({ default: mod.ReactCrop })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )
});

// Lazy load blueimp-load-image
let loadImage: any = null;
if (typeof window !== 'undefined') {
  import('blueimp-load-image').then(module => {
    loadImage = module.default;
  });
}

export default function BasicDetailsPage() {
  const router = useRouter();
  const [selectedCompanySize, setSelectedCompanySize] = useState<string>('');
  const [avatarImage, setAvatarImage] = useState<string>('/onedot.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [organizationName, setOrganizationName] = useState<string>('');
  const [organizationDomain, setOrganizationDomain] = useState<string>('');

  // Cropping states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [imgSrc, setImgSrc] = useState('');
  const [croppedImageUrl, setCroppedImageUrl] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const companySizeOptions = [
    { label: '1-10 employees', icon: '🏠', description: 'Small startup' },
    { label: '11-50 employees', icon: '🏢', description: 'Growing team' },
    { label: '51-200 employees', icon: '🏗️', description: 'Mid-sized company' },
    { label: '201-500 employees', icon: '🏢', description: 'Large organization' },
    { label: '501-1000 employees', icon: '🏙️', description: 'Enterprise level' },
    { label: '1000+ employees', icon: '🌆', description: 'Major corporation' }
  ];

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Helper function to center the crop
  const centerAspectCrop = useCallback(
    (mediaWidth: number, mediaHeight: number, aspect: number) => {
      return centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 90,
          },
          aspect,
          mediaWidth,
          mediaHeight
        ),
        mediaWidth,
        mediaHeight
      );
    },
    []
  );

  // Function to get cropped image as blob
  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: PixelCrop, fileName: string): Promise<Blob | null> => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return Promise.reject(new Error('No 2d context'));
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg', 0.95);
      });
    },
    []
  );

  // Function to generate preview
  const generatePreview = useCallback(async () => {
    if (!completedCrop || !imgRef.current) return;

    try {
      const blob = await getCroppedImg(imgRef.current, completedCrop, 'preview.jpg');
      if (blob) {
        const url = URL.createObjectURL(blob);
        setCroppedImageUrl(url);
      }
    } catch (error) {
      console.error('Error generating preview:', error);
    }
  }, [completedCrop, getCroppedImg]);

  // Handle image load for cropping
  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const centeredCrop = centerAspectCrop(width, height, 1); // 1:1 aspect ratio for avatar
      setCrop(centeredCrop);
    },
    [centerAspectCrop]
  );

  // Handle crop complete
  const onCropComplete = useCallback((crop: PixelCrop) => {
    setCompletedCrop(crop);
    // Auto-generate preview when crop completes
    if (imgRef.current) {
      generatePreview();
    }
  }, [generatePreview]);

  // Handle file selection with EXIF correction
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !loadImage) return;

    // Use blueimp-load-image to handle EXIF orientation
    loadImage(
      file,
      (img: any) => {
        const canvas = img as HTMLCanvasElement;
        const dataURL = canvas.toDataURL('image/jpeg', 0.95);
        setImgSrc(dataURL);
        setCropModalOpen(true);
      },
      {
        orientation: true, // Correct EXIF orientation
        canvas: true, // Return as canvas
        maxWidth: 800,
        maxHeight: 800,
      }
    );
  }, []);

  // Handle crop save
  const handleCropSave = useCallback(async () => {
    if (!completedCrop || !imgRef.current) return;

    try {
      const blob = await getCroppedImg(imgRef.current, completedCrop, 'avatar.jpg');
      if (blob) {
        const url = URL.createObjectURL(blob);
        setAvatarImage(url);
        setCropModalOpen(false);
        setImgSrc('');
        setCrop(undefined);
        setCompletedCrop(undefined);
        setCroppedImageUrl('');
      }
    } catch (error) {
      console.error('Error saving crop:', error);
    }
  }, [completedCrop, getCroppedImg]);

  // Handle crop cancel
  const handleCropCancel = useCallback(() => {
    setCropModalOpen(false);
    setImgSrc('');
    setCrop(undefined);
    setCompletedCrop(undefined);
    setCroppedImageUrl('');
  }, []);

  // Auto-generate preview when crop changes
  useEffect(() => {
    if (completedCrop && imgRef.current) {
      generatePreview();
    }
  }, [completedCrop, generatePreview]);

  // Validation for Next button
  const isNextEnabled = organizationName.trim() !== '' && organizationDomain.trim() !== '';
  return (
    <ProtectedLayout>
      <PageTransition>
      <div className="relative w-full min-h-screen bg-white flex flex-col items-center justify-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className="absolute w-[140px] h-8 left-7 top-7">
        <Image
          src="/onedot.svg"
          alt="Onedot Logo"
          width={140}
          height={32}
          priority
        />
      </div>

      {/* Main Content Container - Centered */}
      <div className="flex flex-col items-center justify-center space-y-4 max-w-2xl w-full px-8">
        {/* Header */}
        <div className="text-[#171923] text-center font-bold" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: '700', lineHeight: '100%' }}>
          Create an Organisation
        </div>

        {/* Welcome Text */}
        <div className="text-black text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: '500', lineHeight: '100%' }}>
          Welcome to OneDot HRM ! Let's get you set up.
        </div>

        {/* Form Container */}
        <div className="flex flex-col space-y-4 w-full max-w-md">
          {/* Organization Domain Section */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-black text-left font-bold" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: '700', lineHeight: '150%', letterSpacing: '0.005em' }}>
                Organization Domain
              </div>
              <div className="text-black text-left font-semibold" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8px', fontWeight: '600', lineHeight: '150%', letterSpacing: '0.005em' }}>
                (Required)
              </div>
            </div>

            {/* Organization Domain Input */}
            <div className="w-full h-10 bg-white border border-[#03A9F5] rounded-lg px-3 py-2 flex items-center overflow-hidden" style={{ boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}>
              <div className="text-[#737373] text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '150%', letterSpacing: '0.005em' }}>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800' }}>https://onedothrm.com/</span>
                <input
                  type="text"
                  placeholder="organisation_name"
                  value={organizationDomain}
                  onChange={(e) => setOrganizationDomain(e.target.value)}
                  className="inline-block bg-transparent outline-none text-[#737373] placeholder:text-[#737373]"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '150%', letterSpacing: '0.005em' }}
                />
              </div>
              <div className="ml-auto">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 5.5V8.5" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8" cy="10.5" r="0.5" fill="#737373"/>
                </svg>
              </div>
            </div>

            {/* Domain Setup Note */}
            <div className="text-[#374151] text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: '400', lineHeight: '20px' }}>
              <strong>NOTE:</strong> Setup custom domain after creation of organisation
            </div>
          </div>

          {/* Organisation Name Section */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-black text-left font-bold" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: '700', lineHeight: '150%', letterSpacing: '0.005em' }}>
                Organisation Name
              </div>
              <div className="text-black text-left font-semibold" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8px', fontWeight: '600', lineHeight: '150%', letterSpacing: '0.005em' }}>
                (Required)
              </div>
            </div>

            {/* Organisation Name Input */}
            <div className="w-full h-10 bg-white border border-[#03A9F5] rounded-lg px-3 py-2 flex items-center overflow-hidden" style={{ boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}>
              <input
                type="text"
                placeholder="organisation_name"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="flex-1 text-[#737373] text-left outline-none"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '150%', letterSpacing: '0.005em' }}
              />
            </div>
          </div>

          {/* Company Size Section */}
          <div className="flex flex-col space-y-2">
            <div className="text-black text-left font-bold" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: '700', lineHeight: '150%', letterSpacing: '0.005em' }}>
              Company Size
            </div>

            {/* Company Size Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-full h-10 bg-white border border-[#DEDEDE] rounded-lg px-3 py-2 flex items-center justify-between overflow-hidden cursor-pointer hover:border-[#03A9F5] transition-colors" style={{ boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' }}>
                  <div className={`text-left ${selectedCompanySize ? 'text-[#0A0A0A]' : 'text-[#737373]'}`} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: '400', lineHeight: '150%', letterSpacing: '0.005em' }}>
                    {selectedCompanySize || 'Select company size'}
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#0A0A0A] opacity-60" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[280px] rounded-lg shadow-lg border border-[#DEDEDE]" align="end">
                {companySizeOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.label}
                    onClick={() => setSelectedCompanySize(option.label)}
                    className="cursor-pointer hover:bg-[#F7FAFC] focus:bg-[#F7FAFC] px-4 py-3 flex items-center gap-3"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: '400' }}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-[#0A0A0A]">{option.label}</span>
                      <span className="text-xs text-[#737373]">{option.description}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between w-full max-w-md pt-4">
          <button 
            onClick={() => router.push('/setup-org')}
            style={{
              padding: '6px 12px',
              background: 'none',
              border: 'none',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontFamily: 'Montserrat',
              fontWeight: 500,
              fontSize: '16px',
              color: '#1D1B20',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#F3F4F6')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          <button 
            onClick={() => router.push('/org-preference')}
            disabled={!isNextEnabled}
            style={{
              padding: '6px 12px',
              background: 'none',
              border: 'none',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: isNextEnabled ? 'pointer' : 'not-allowed',
              fontFamily: 'Montserrat',
              fontWeight: 500,
              fontSize: '16px',
              color: isNextEnabled ? '#1D1B20' : '#9CA3AF',
              transition: 'background 0.2s',
              opacity: isNextEnabled ? 1 : 0.5,
            }}
            onMouseEnter={(e) => {
              if (isNextEnabled) e.currentTarget.style.background = '#F3F4F6';
            }}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
          >
            Next
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Avatar - Positioned according to Figma specs */}
      <div className="absolute" style={{ left: '72.76%', top: '36.39%' }}>
        <div className="relative">
          <Avatar className="w-20 h-20 ring-4 ring-white shadow-2xl border-2 border-gray-100 cursor-pointer hover:ring-blue-200 transition-all duration-200" onClick={handleAvatarClick}>
            <AvatarImage src={avatarImage} alt="User Avatar" className="object-cover" />
            <AvatarFallback className="bg-linear-to-br from-blue-500 to-blue-600 text-white font-semibold">JD</AvatarFallback>
          </Avatar>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-400/20 to-blue-600/20 blur-xl -z-10"></div>
        </div>
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Crop Modal */}
      {cropModalOpen && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Crop Your Avatar
              </h3>
              <button
                onClick={handleCropCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Crop Area */}
              <div className="flex-1">
                <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                  {imgSrc && (
                    <Suspense fallback={
                      <div className="flex items-center justify-center p-8">
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    }>
                      <ReactCrop
                        crop={crop}
                        onChange={setCrop}
                        onComplete={onCropComplete}
                        aspect={1}
                        circularCrop
                        className="max-w-full"
                      >
                        <img
                          ref={imgRef}
                          src={imgSrc}
                          alt="Crop preview"
                          onLoad={onImageLoad}
                          className="max-w-full max-h-96 object-contain"
                          style={{ display: 'block' }}
                        />
                      </ReactCrop>
                    </Suspense>
                  )}
                </div>
              </div>

              {/* Preview */}
              <div className="flex flex-col items-center gap-4">
                <div className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Preview
                </div>
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                  {croppedImageUrl ? (
                    <img
                      src={croppedImageUrl}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div className="text-xs text-gray-500 text-center">Preview will appear here</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCropCancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Cancel
              </button>
              <button
                onClick={handleCropSave}
                disabled={!completedCrop}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Save Avatar
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </PageTransition>
    </ProtectedLayout>
  );
}
