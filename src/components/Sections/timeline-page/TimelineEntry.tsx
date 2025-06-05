'use client';

import Image from 'next/image';
import { useState } from 'react';
// import { FaRegComment } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TimelineEntryType } from '@/lib/types';
import { Button, Modal, List, Avatar, Input, Form, Empty } from 'antd';
import { IoSend } from 'react-icons/io5';

interface TimelineEntryProps {
  entry: TimelineEntryType;
  isAlternate?: boolean;
}

const TimelineEntry = ({ entry, isAlternate = false }: TimelineEntryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState(entry.comments);
  const [selectPost, setSelectPost] = useState<TimelineEntryType | null>(null);
  const [form] = Form.useForm();

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
            'relative overflow-hidden rounded-lg shadow-md aspect-[5/3]',
            isAlternate && 'lg:col-start-2'
          )}
        >
          <Image
            src={entry.imageUrl || '/placeholder.svg'}
            alt={entry.title}
            width={1200}
            height={1200}
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
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
              {entry.date}
            </time>
            <span className="text-xl font-bold text-[#0C469D] leading-none text-[32px]">
              {entry.year}
            </span>
          </div>

          <h2 className="text-xl lg:text-4xl font-bold text-gray-900 mb-3">
            {entry.title}
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {entry.description}
          </p>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500 italic">
              Explore key moments in Black history—from systemic laws and
              struggles to breakthroughs and triumphs.
            </p>
            <p className="text-sm text-gray-500 italic">
              Each entry is more than just a date; it&lsquo;s a story of how our
              past shaped our present.
            </p>
          </div>

          <Button
            onClick={() => {
              setSelectPost(entry);
              handleComment();
            }}
            // className="!w-fit !text-white !bg-[#072A5E] !my-12"
            className="!w-fit  !my-12 !bg-[#E7EDF5] !p-4 !py-6"
          >
            <svg
              width="33"
              height="32"
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
              {/* <h3 className="text-lg font-semibold mb-3">Leave a comment...</h3> */}
              <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                  name="comment"
                  rules={[
                    { required: true, message: 'Please enter your comment' },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Leave a comment..."
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
    </>
  );
};

export default TimelineEntry;
