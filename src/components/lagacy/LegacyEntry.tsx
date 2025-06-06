'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TimelineEntryType } from '@/lib/types';
import { Button, Modal, List, Avatar, Input, Form, Empty } from 'antd';
import { IoSend } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

interface TimelineEntryProps {
  entry: TimelineEntryType;
}

const LegacyEntry = ({ entry }: TimelineEntryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState(entry.comments);
  const [selectPost, setSelectPost] = useState<TimelineEntryType | null>(null);
  const [form] = Form.useForm();
  const router = useRouter();
  const handleComment = () => {
    setSelectPost(entry);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values: { comment: string }) => {
    const newComment = {
      authId: 'new_user_id',
      authImage: '/default-avatar.jpg',
      authName: 'New User',
      commentDescription: values.comment,
    };
    setComments([...comments, newComment]);
    form.resetFields();
  };

  const handleClick = (id: string) => {
    router.push(`/legacy/${id}`);
  };

  return (
    <div className='p-1 border border-gray-200 rounded-md shadow-md'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex gap-2"
      >
        <div
          className={cn(
            'relative overflow-hidden !w-[250px] min-w-[250px] min-h-[260px] !h-[260px]  rounded-lg shadow-md'
          )}
        >
          <Image
            src={entry.imageUrl || '/placeholder.svg'}
            alt={entry.title}
            width={1200}
            height={1200}
            className="w-full  h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
        </div>

        {/* Content */}
        <div className={cn('flex flex-col justify-center')}>
          <h2 className="text-xl  font-semibold text-gray-900 mb-3">
            {entry.title.slice(0, 25)}...
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <time className="text-sm font-medium text-gray-500">
              {entry.date}
            </time>
            <span className="text-xl font-bold text-blue-600">
              {entry.year}
            </span>
          </div>
          <span className="text-sm flex itams-center mb-2 text-gray-500">
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
            {entry.graveyard}
          </span>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {entry?.description?.slice(0, 150)}...
          </p>
          <div className="w-full flex items-center gap-3">
            <Button
            onClick={() => {
              setSelectPost(entry);
              handleComment();
            }}
            // className="!w-fit !text-white !bg-[#072A5E] !my-12"
            className="!w-fit !bg-[#E7EDF5] "
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 30.4132C15.58 30.4132 14.7134 29.9465 14.1 29.1332L12.1 26.4665C12.06 26.4132 11.9 26.3465 11.8334 26.3332H11.1667C5.60669 26.3332 2.16669 24.8265 2.16669 17.3332V10.6665C2.16669 4.77317 5.27335 1.6665 11.1667 1.6665H21.8334C27.7267 1.6665 30.8334 4.77317 30.8334 10.6665V17.3332C30.8334 23.2265 27.7267 26.3332 21.8334 26.3332H21.1667C21.06 26.3332 20.9667 26.3865 20.9 26.4665L18.9 29.1332C18.2867 29.9465 17.42 30.4132 16.5 30.4132ZM11.1667 3.6665C6.39335 3.6665 4.16669 5.89317 4.16669 10.6665V17.3332C4.16669 23.3598 6.23335 24.3332 11.1667 24.3332H11.8334C12.5134 24.3332 13.2867 24.7198 13.7 25.2665L15.7 27.9332C16.1667 28.5465 16.8334 28.5465 17.3 27.9332L19.3 25.2665C19.74 24.6798 20.4334 24.3332 21.1667 24.3332H21.8334C26.6067 24.3332 28.8334 22.1065 28.8334 17.3332V10.6665C28.8334 5.89317 26.6067 3.6665 21.8334 3.6665H11.1667Z"
                fill="#6F6F6F"
              />
              <path
                d="M23.1666 11.6665H9.83331C9.28665 11.6665 8.83331 11.2132 8.83331 10.6665C8.83331 10.1198 9.28665 9.6665 9.83331 9.6665H23.1666C23.7133 9.6665 24.1666 10.1198 24.1666 10.6665C24.1666 11.2132 23.7133 11.6665 23.1666 11.6665Z"
                fill="#6F6F6F"
              />
              <path
                d="M17.8333 18.3335H9.83331C9.28665 18.3335 8.83331 17.8802 8.83331 17.3335C8.83331 16.7868 9.28665 16.3335 9.83331 16.3335H17.8333C18.38 16.3335 18.8333 16.7868 18.8333 17.3335C18.8333 17.8802 18.38 18.3335 17.8333 18.3335Z"
                fill="#6F6F6F"
              />
            </svg>
            <span>{comments.length}</span>
          </Button>
            <Button
              onClick={() => handleClick(entry.id)}
              icon={<FaEye />}
              className="!w-fit !px-2  !bg-[#E7EDF5] "
            >
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
          <>
            {/* <div className="mb-6">
              <div>
                <Image
                  src={selectPost.imageUrl || '/placeholder.svg'}
                  alt={selectPost.title}
                  width={1500}
                  height={400}
                  className="w-full h-[400px] object-cover mt-4"
                />
                <h4 className="font-bold">{selectPost.title}</h4>
                <p>
                  {selectPost.date} | {selectPost.year}
                </p>
                <p>{selectPost.description}</p>
              </div>
            </div> */}

            <div className="mb-6 overflow-y-scroll max-h-[300px]">
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              {comments.length === 0 ? (
                <Empty description={'No Comment in this post'} />
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={comments}
                  renderItem={(comment) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            shape="circle"
                            size={24}
                            src={comment.authImage || '/default-avatar.jpg'}
                            className="rounded-md"
                          />
                        }
                        title={
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              {comment.authName}
                            </span>
                          </div>
                        }
                        description={
                          <div className="line-clamp-2 text-sm text-gray-600">
                            {comment.commentDescription}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3">Add Your Comment</h3>
              <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                  name="comment"
                  rules={[
                    { required: true, message: 'Please enter your comment' },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Share your thoughts on this timeline..."
                  />
                </Form.Item>
                <Form.Item className="mb-0 text-right">
                  <Button
                    icon={<IoSend />}
                    className="!w-full !bg-[#072A5E] hover:!bg-[#7898C9] !text-white hover:!text-black"
                    htmlType="submit"
                  >
                    Post Comment
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default LegacyEntry;
