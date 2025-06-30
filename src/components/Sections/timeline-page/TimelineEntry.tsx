'use client';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, Modal, Form } from 'antd';
import { MdInsertComment } from 'react-icons/md';
import { useGetProfileDataQuery } from '@/app/provider/Redux/service/profileApis';
import { useCreateCommentMutation } from '@/app/provider/Redux/service/timelineApis';
import { toast } from 'sonner';
import CommentModal from './CommentModal';
import { TimelineEntryType } from '@/types/models';
interface TimelineEntryProps {
  entry: TimelineEntryType;
  isAlternate?: boolean;
}

const TimelineEntry = ({ entry, isAlternate = false }: TimelineEntryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectPost, setSelectPost] = useState<any | null>(null);
  const [form] = Form.useForm();
  const { data: profileData } = useGetProfileDataQuery();
  const [createComment, { isLoading: isCommentLoading }] =
    useCreateCommentMutation();
  const handleComment = () => {
    setSelectPost(entry);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = useCallback(
    async (values: { description: string }) => {
      try {
        const data = {
          description: values.description,
          userId: profileData?.data?._id,
          timelineId: entry?._id,
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
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn(
          'grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10',
          isAlternate && 'lg:grid-flow-dense'
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-lg shadow-md sm:aspect-[5/3] md:aspect-[16/9]',
            isAlternate && 'lg:col-start-2'
          )}
        >
          <Image
            src={entry?.img}
            alt={entry?.title}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
        </div>

        {/* Content */}
        <div
          className={cn(
            'flex flex-col justify-center',
            isAlternate && 'lg:col-start-1'
          )}
        >
          <div className="flex items-end gap-2 mb-4">
            <time className="text-sm font-medium text-gray-500 ">
              {entry?.date}
            </time>
            <span className="text-xl font-bold text-[#0C469D] leading-none text-[32px]">
              {entry?.year}
            </span>
          </div>

          <h2 className="text-xl lg:text-4xl font-bold text-gray-900 mb-3">
            {entry?.title}
          </h2>
          <p
            className="text-gray-600 text-lg mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: entry?.description.slice(0, 300) + '...',
            }}
          />
          <div className="flex items-center justify-start gap-2">
            <Button
              onClick={() => {
                setSelectPost(entry);
                handleComment();
              }}
              className="!w-fit !bg-[#E7EDF5] !p-4 !py-6"
            >
              <MdInsertComment />
              <span>{entry?.comments?.length}</span>
            </Button>
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
          <CommentModal
            form={form}
            isCommentLoading={isCommentLoading}
            selectPost={selectPost}
            handleSubmit={handleSubmit}
          />
        )}
      </Modal>
    </>
  );
};

export default TimelineEntry;
