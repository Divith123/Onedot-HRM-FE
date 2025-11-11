'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProtectedLayout } from '@/components/auth/ProtectedLayout';
import Sidebar from '@/components/pages/common/Sidebar';
import { Navbar } from '@/components/ui/navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, Users, UserPlus } from 'lucide-react';

interface OrganizationData {
  organizationName: string;
  contactEmail: string;
  organizationType: string;
  aiAgentAddon: boolean;
  createdAt: string;
  step: string;
}

interface Member {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatar?: string;
}

export default function AddMembersPage() {
  const router = useRouter();
  const [organizationData, setOrganizationData] = useState<OrganizationData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load organization data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('organizationSetup');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setOrganizationData(data);
      } catch (error) {
        console.error('Error parsing organization data:', error);
        // Redirect back to organization setup if data is corrupted
        router.push('/organization');
      }
    } else {
      // No organization data found, redirect back
      router.push('/organization');
    }
  }, [router]);

  // Mock search function - in real app this would call an API
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock search results
    const mockResults: Member[] = [
      {
        id: '1',
        username: 'johndoe',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
      },
      {
        id: '2',
        username: 'janedoe',
        fullName: 'Jane Doe',
        email: 'jane.doe@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane'
      },
      {
        id: '3',
        username: 'bobsmith',
        fullName: 'Bob Smith',
        email: 'bob.smith@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob'
      }
    ].filter(member =>
      member.username.toLowerCase().includes(query.toLowerCase()) ||
      member.fullName.toLowerCase().includes(query.toLowerCase()) ||
      member.email.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(mockResults);
    setIsSearching(false);
  };

  // Handle search input change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const addMember = (member: Member) => {
    if (!selectedMembers.find(m => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  const removeMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== memberId));
  };

  const handleCompleteSetup = () => {
    // Save member data to localStorage
    const completeOrganizationData = {
      ...organizationData,
      members: selectedMembers,
      completedAt: new Date().toISOString(),
      step: 'members-added'
    };

    localStorage.setItem('organizationSetup', JSON.stringify(completeOrganizationData));

    // Navigate to confirm access page for final authentication
    router.push('/confirm-access');
  };

  const handleSkipStep = () => {
    // Save organization data with no members
    const completeOrganizationData = {
      ...organizationData,
      members: [],
      completedAt: new Date().toISOString(),
      step: 'members-skipped'
    };

    localStorage.setItem('organizationSetup', JSON.stringify(completeOrganizationData));

    // Navigate to confirm access page for final authentication
    router.push('/confirm-access');
  };

  if (!organizationData) {
    return (
      <ProtectedLayout>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading organization data...</p>
            </div>
          </div>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <Navbar />

          {/* Add Members Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Start collaborating
                </h1>
                <h2 className="text-xl font-semibold text-gray-700">
                  Welcome to {organizationData.organizationName}
                </h2>
              </div>

              {/* Add Members Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-start space-x-3 mb-4">
                  <UserPlus className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Add organization members
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Organization members will be able to view repositories, organize into teams, review code, and tag other members using @mentions.
                    </p>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Learn more about permissions for organizations →
                    </a>
                  </div>
                </div>

                {/* Search Input */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search by username, full name or email address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="border border-gray-200 rounded-lg mb-4 max-h-48 overflow-y-auto">
                    {searchResults.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.username}`}
                            alt={member.fullName}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{member.fullName}</p>
                            <p className="text-xs text-gray-500">@{member.username} • {member.email}</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => addMember(member)}
                          size="sm"
                          variant="outline"
                          disabled={selectedMembers.some(m => m.id === member.id)}
                        >
                          {selectedMembers.some(m => m.id === member.id) ? 'Added' : 'Add'}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Selected Members */}
                {selectedMembers.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Selected members ({selectedMembers.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMembers.map((member) => (
                        <Badge
                          key={member.id}
                          variant="secondary"
                          className="flex items-center space-x-1 pr-1"
                        >
                          <span>@{member.username}</span>
                          <button
                            onClick={() => removeMember(member.id)}
                            className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* No results message */}
                {searchQuery && !isSearching && searchResults.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No users found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <Button
                  onClick={handleSkipStep}
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Skip this step
                </Button>
                <Button
                  onClick={handleCompleteSetup}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
                >
                  Complete setup
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}