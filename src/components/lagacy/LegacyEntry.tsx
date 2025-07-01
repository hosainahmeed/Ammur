'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, Modal, Form } from 'antd';
import { MdInsertComment } from 'react-icons/md';
import LegecyCommentModal from './LegecyCommentModal';
import { useGetProfileDataQuery } from '@/app/provider/Redux/service/profileApis';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useCreateLegacyCommentMutation } from '@/app/provider/Redux/service/lagecyApis';

interface LegacyEntryProps {
  entry: {
    _id: string;
    title: string;
    familyName: string;
    dateOfBirth: string;
    burial: string;
    description: string;
    img: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    comments: any;
  };
}

const LegacyEntry = ({ entry }: LegacyEntryProps) => {
  const router = useRouter();
  const { data: profileData } = useGetProfileDataQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectPost, setSelectPost] = useState<any | null>(null);
  const [form] = Form.useForm();
  const [createComment, { isLoading: isCommentLoading }] =
    useCreateLegacyCommentMutation();
  const handleComment = () => {
    setSelectPost(entry);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = (id: string) => {
    router.push(`/legacy/${id}`);
  };

  const handleSubmit = useCallback(
    async (values: { description: string }) => {
      try {
        const data = {
          description: values?.description,
          userId: profileData?.data?._id,
          legacyId: entry?._id,
        };
        await createComment({ data })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Comment added successfully');
            }
          });
        form.resetFields();
      } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to add comment');
      }
    },
    [form, entry, profileData?.data?._id, createComment]
  );
  return (
    <div className="p-2 border border-gray-200 rounded-md shadow-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <div
          className={cn(
            'relative overflow-hidden !w-full min-w-[250px] min-h-[260px] !h-[260px]  rounded-lg shadow-md'
          )}
        >
          <Image
            src={entry?.img || '/placeholder.svg'}
            alt={entry?.title}
            width={1200}
            height={1200}
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
        </div>

        {/* Content */}
        <div className={cn('flex flex-col !h-full !justify-between gap-2')}>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {entry?.title.slice(0, 25)}...
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <time className="text-sm font-medium text-gray-500">
              {new Date(entry?.dateOfBirth).toLocaleDateString()}
            </time>
            <span className="text-xl font-bold text-blue-600">
              {new Date(entry?.createdAt).getFullYear()}
            </span>
          </div>
          <span className="text-sm flex items-center mb-2 text-gray-500">
            {/* Replace this with actual graveyard information if you have it */}
            <svg
              width="16"
              height="19"
              viewBox="0 0 16 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.68594 0.0515614C6.98281 0.117188 6.36406 0.398438 5.84844 0.890625C5.69375 1.03125 5.51562 1.2375 5.44531 1.34531L5.31406 1.54688H4.08125C3.02656 1.54688 2.83906 1.55625 2.77813 1.62187C2.7125 1.6875 2.70312 2.28281 2.70312 7.50469V13.3125H2.23438C1.84531 13.3125 1.75156 13.3266 1.68594 13.3969C1.63438 13.4484 1.51719 13.8187 1.39062 14.3344L1.18438 15.1875H0.8375C0.5375 15.1875 0.48125 15.2016 0.382813 15.3047L0.265625 15.4172V16.6312C0.265625 17.7844 0.270313 17.8453 0.359375 17.9437L0.457813 18.0469H8.01875C15.2844 18.0469 15.5844 18.0422 15.6547 17.9625C15.725 17.8875 15.7344 17.7234 15.7344 16.6031C15.7344 15.1078 15.7672 15.1875 15.1859 15.1875H14.8484L14.8016 15.0094C14.7734 14.9156 14.6797 14.5312 14.5859 14.1562C14.4922 13.7812 14.3797 13.4391 14.3422 13.3922C14.2813 13.3266 14.1875 13.3125 13.8031 13.3125H13.3438V7.52344C13.3438 1.79531 13.3438 1.73438 13.25 1.64062C13.1609 1.55156 13.0953 1.54688 11.9422 1.54688H10.7328L10.5969 1.35469C10.5266 1.25156 10.3156 1.02187 10.1328 0.853125C9.46719 0.234375 8.65156 -0.032814 7.68594 0.0515614ZM8.70312 0.735937C9.26562 0.885937 9.89375 1.36406 10.1797 1.84687C10.25 1.96875 10.3438 2.08594 10.3906 2.10937C10.4422 2.1375 10.9625 2.15625 11.6047 2.15625H12.7344V7.73438V13.3125H8.02344H3.3125V7.73438V2.15625H4.45156C5.29531 2.15625 5.60938 2.14219 5.66094 2.09531C5.69844 2.06719 5.79219 1.94531 5.8625 1.83281C6.47656 0.871874 7.60156 0.435936 8.70312 0.735937ZM14.0422 14.5078C14.1219 14.8266 14.1875 15.1125 14.1875 15.1406C14.1875 15.1734 12.2 15.1875 7.99531 15.1875C2.12188 15.1875 1.80781 15.1828 1.83125 15.1031C1.84531 15.0609 1.91094 14.8031 1.97656 14.5312C2.04219 14.2594 2.10781 14.0109 2.11719 13.9781C2.13125 13.9359 3.35469 13.9219 8.01406 13.9219H13.8969L14.0422 14.5078ZM15.125 16.6172V17.4375H8H0.875V16.6172V15.7969H8H15.125V16.6172Z"
                fill="#6F6F6F"
              />
            </svg>
            {entry?.burial || 'No burial information available'}
          </span>
          <p
            className="text-gray-600 mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html:
                entry?.description.slice(0, 170) || 'No description available.',
            }}
          />
          <div className="w-full flex items-center gap-3">
            <Button
              onClick={() => {
                setSelectPost(entry);
                handleComment();
              }}
              className="!w-fit !bg-[#E7EDF5] !p-2"
            >
              <MdInsertComment />
            </Button>
            <Button
              onClick={() => handleClick(entry?._id)}
              icon={<FaEye />}
              className="!w-fit !px-2 !bg-[#E7EDF5]"
            ></Button>
          </div>
        </div>
      </motion.div>

      {/* Comment Modal */}
      <Modal
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        {selectPost && (
          <LegecyCommentModal
            form={form}
            isCommentLoading={isCommentLoading}
            selectPost={selectPost}
            handleSubmit={handleSubmit}
          />
        )}
      </Modal>
    </div>
  );
};

export default LegacyEntry;
