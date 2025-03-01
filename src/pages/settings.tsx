'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Pencil, ChevronDown, Loader2, Upload } from 'lucide-react';
import type React from 'react';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type FormData = {
  yourName: string;
  userName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState('edit-profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ItsODbBKgYoOqqwsEFA6chJvoFrW6p.png',
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      yourName: 'Charlene Reed',
      userName: 'Charlene Reed',
      email: 'charlenereed@gmail.com',
      password: '**********',
      dateOfBirth: '25 January 1990',
      presentAddress: 'San Jose, California, USA',
      permanentAddress: 'San Jose, California, USA',
      city: 'San Jose',
      postalCode: '45962',
      country: 'USA',
    },
  });

  const onSubmit = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSaving(false);
    toast.success('Settings saved successfully!');
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsUploading(false);

      // Update profile image (in a real scenario, this would be the URL returned from the server)
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      toast.success('Profile picture updated successfully!');
      setIsDialogOpen(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Setting</h1>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                className={`cursor-pointer py-4 px-1 relative ${
                  activeTab === 'edit-profile'
                    ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('edit-profile')}>
                Edit Profile
              </button>
              <button
                className={`cursor-pointer py-4 px-1 ${
                  activeTab === 'preferences'
                    ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('preferences')}>
                Preferences
              </button>
              <button
                className={`cursor-pointer py-4 px-1 ${
                  activeTab === 'security'
                    ? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('security')}>
                Security
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'edit-profile' && (
              <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
                <div className="md:flex md:gap-12">
                  {/* Profile Image Section - Left Side on Desktop */}
                  <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 md:w-48">
                    <div className="relative">
                      <img
                        src={profileImage || '/placeholder.svg'}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-32 h-32 rounded-full object-cover"
                      />
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <button className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
                            <Pencil className="h-4 w-4" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle>Update Profile Picture</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag
                                    and drop
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG or GIF (MAX. 800x400px)
                                  </p>
                                </div>
                                <input
                                  id="dropzone-file"
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleFileChange}
                                  ref={fileInputRef}
                                />
                              </label>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button
                                onClick={triggerFileInput}
                                disabled={isUploading}
                                className="bg-gray-900 text-white px-8 py-2.5 rounded-full hover:bg-gray-800 transition-colors text-sm font-medium relative overflow-hidden cursor-pointer">
                                {isUploading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading...
                                  </>
                                ) : (
                                  'Upload'
                                )}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Form Section - Right Side on Desktop */}
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          {...register('yourName', { required: 'Your name is required' })}
                          className={`w-full px-4 py-2.5 border ${
                            errors.yourName ? 'border-red-500' : 'border-gray-200'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600`}
                          placeholder="Enter your name"
                        />
                        {errors.yourName && (
                          <p className="mt-1 text-xs text-red-500">{errors.yourName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          User Name
                        </label>
                        <input
                          {...register('userName', { required: 'Username is required' })}
                          className={`w-full px-4 py-2.5 border ${
                            errors.userName ? 'border-red-500' : 'border-gray-200'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600`}
                          placeholder="Enter username"
                        />
                        {errors.userName && (
                          <p className="mt-1 text-xs text-red-500">{errors.userName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: 'Invalid email address',
                            },
                          })}
                          className={`w-full px-4 py-2.5 border ${
                            errors.email ? 'border-red-500' : 'border-gray-200'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600`}
                          placeholder="Enter email"
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <input
                          {...register('password', {
                            required: 'Password is required',
                            minLength: {
                              value: 8,
                              message: 'Password must be at least 8 characters',
                            },
                          })}
                          type="password"
                          className={`w-full px-4 py-2.5 border ${
                            errors.password ? 'border-red-500' : 'border-gray-200'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600`}
                          placeholder="Enter password"
                        />
                        {errors.password && (
                          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <input
                            {...register('dateOfBirth', { required: 'Date of birth is required' })}
                            className={`w-full px-4 py-2.5 border ${
                              errors.dateOfBirth ? 'border-red-500' : 'border-gray-200'
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600`}
                            placeholder="Select date"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        {errors.dateOfBirth && (
                          <p className="mt-1 text-xs text-red-500">{errors.dateOfBirth.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Present Address
                        </label>
                        <input
                          {...register('presentAddress', {
                            required: 'Present address is required',
                          })}
                          className={`w-full px-4 py-2.5 border ${
                            errors.presentAddress ? 'border-red-500' : 'border-gray-200'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600`}
                          placeholder="Enter present address"
                        />
                        {errors.presentAddress && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.presentAddress.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Permanent Address
                        </label>
                        <input
                          {...register('permanentAddress', {
                            required: 'Permanent address is required',
                          })}
                          className={`w-full px-4 py-2.5 border ${
                            errors.permanentAddress ? 'border-red-500' : 'border-gray-200'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600`}
                          placeholder="Enter permanent address"
                        />
                        {errors.permanentAddress && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.permanentAddress.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          {...register('city', { required: 'City is required' })}
                          className={`w-full px-4 py-2.5 border ${
                            errors.city ? 'border-red-500' : 'border-gray-200'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600`}
                          placeholder="Enter city"
                        />
                        {errors.city && (
                          <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          {...register('postalCode', { required: 'Postal code is required' })}
                          className={`w-full px-4 py-2.5 border ${
                            errors.postalCode ? 'border-red-500' : 'border-gray-200'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600`}
                          placeholder="Enter postal code"
                        />
                        {errors.postalCode && (
                          <p className="mt-1 text-xs text-red-500">{errors.postalCode.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          {...register('country', { required: 'Country is required' })}
                          className={`w-full px-4 py-2.5 border ${
                            errors.country ? 'border-red-500' : 'border-gray-200'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600`}
                          placeholder="Enter country"
                        />
                        {errors.country && (
                          <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="relative mt-8 flex justify-end">
                      <AnimatePresence mode="wait">
                        {!isSaving && !isSaved && (
                          <motion.button
                            type="submit"
                            key="save"
                            className="bg-gray-900 text-white px-8 py-2.5 rounded-full hover:bg-gray-800 transition-colors text-sm font-medium relative overflow-hidden cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isSaving}>
                            <span className="opacity-100">Save</span>
                          </motion.button>
                        )}
                        {isSaving && (
                          <motion.div
                            key="saving"
                            className="relative h-full px-8 py-2.5 rounded-full bg-gray-900 text-white flex items-center text-sm font-medium overflow-hidden"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Saving...</span>
                          </motion.div>
                        )}
                        {isSaved && (
                          <motion.div
                            key="saved"
                            className="relative h-full px-8 py-2.5 rounded-full bg-green-500 text-white flex items-center text-sm font-medium overflow-hidden"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}>
                            <span>Saved!</span>
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'preferences' && (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500 text-lg">Preferences content will go here</p>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500 text-lg">Security content will go here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
