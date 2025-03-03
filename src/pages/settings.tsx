'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Pencil, Loader2, Upload, User } from 'lucide-react';
import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SettingsSkeleton from '@/components/ui/skeletons/settings-skeleton';
import { updateUser } from '@/store/slices/userSlice';
import { AppDispatch, RootState } from '@/store/store';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  userName: z.string().min(3, 'Username must be at least 3 characters.'),
  email: z.string().email('Invalid email address.'),
  password: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true; // Allow empty password (no change)
      return validatePassword(value);
    }, 'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'),
  dateOfBirth: z.string().min(1, 'Date of birth is required.'),
  presentAddress: z.string().min(5, 'Present address must be at least 5 characters.'),
  permanentAddress: z.string().min(5, 'Permanent address must be at least 5 characters.'),
  city: z.string().min(2, 'City must be at least 2 characters.'),
  postalCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid postal code.'),
  country: z.string().min(2, 'Country must be at least 2 characters.'),
});

type FormData = z.infer<typeof formSchema>;

export default function Settings() {
  const [activeTab, setActiveTab] = useState('edit-profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const { status } = user;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...user,
    },
    mode: 'onChange', // Enable real-time validation
  });

  useEffect(() => {
    form.reset({ ...user });
  }, [user, form]);

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await dispatch(updateUser(data)).unwrap(); // Update local state
      toast.success('Settings saved successfully!');
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    }
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
      reader.onload = async (e) => {
        const newAvatarUrl = e.target?.result as string;
        await dispatch(updateUser({ avatar: newAvatarUrl })).unwrap();
      };
      reader.readAsDataURL(file);

      toast.success('Profile picture updated successfully!');
      setIsDialogOpen(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (status === 'idle' || status === 'loading') {
    return <SettingsSkeleton />;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {['edit-profile', 'preferences', 'security'].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 px-1 cursor-pointer relative ${
                    activeTab === tab
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-t-lg bg-gray-900"
                      layoutId="activeTab"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'edit-profile' && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
                  <div className="md:flex md:gap-12">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center md:items-start mb-8 md:mb-0 md:w-48">
                      <div className="relative">
                        {user.avatar ? (
                          <img
                            src={user.avatar || '/placeholder.svg'}
                            alt="Profile"
                            width={128}
                            height={128}
                            className="w-32 h-32 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-16 w-16 text-gray-500" />
                          </div>
                        )}
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
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isSaving || isSaved} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="userName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>User Name</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isSaving || isSaved} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" disabled={isSaving || isSaved} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="••••••••••"
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                  }}
                                  disabled={isSaving || isSaved}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth</FormLabel>
                              <FormControl>
                                <Input {...field} type="date" disabled={isSaving || isSaved} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="presentAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Present Address</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isSaving || isSaved} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="permanentAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Permanent Address</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isSaving || isSaved} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isSaving || isSaved} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isSaving || isSaved} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isSaving || isSaved} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="relative mt-8 flex justify-end">
                        <AnimatePresence mode="wait">
                          {isSaving && (
                            <motion.div
                              key="saving"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}>
                              <Button
                                disabled
                                className="bg-gray-400 text-white px-8 py-2.5 rounded-full">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </Button>
                            </motion.div>
                          )}
                          {isSaved && (
                            <motion.div
                              key="saved"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}>
                              <Button
                                disabled
                                className="bg-green-500 text-white px-8 py-2.5 rounded-full">
                                Saved!
                                <svg
                                  className="h-4 w-4 ml-2 inline"
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
                              </Button>
                            </motion.div>
                          )}
                          {!isSaving && !isSaved && (
                            <motion.div
                              key="save"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}>
                              <Button
                                type="submit"
                                disabled={!form.formState.isValid}
                                className="bg-gray-900 text-white px-8 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
                                Save
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
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

function validatePassword(password: string): boolean {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  return (
    password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
  );
}
