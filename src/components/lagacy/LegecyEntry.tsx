'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaEye, FaRegComment } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TimelineEntryType } from '@/lib/types';
import { Button, Modal, List, Avatar, Input, Form, Empty, Card } from 'antd';
import { IoSend } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

interface TimelineEntryProps {
  entry: TimelineEntryType;
  slug: string;
}

const LegecyEntry = ({ entry, slug }: TimelineEntryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState(entry.comments);
  const [selectPost, setSelectPost] = useState<TimelineEntryType | null>(null);
  const [form] = Form.useForm();
  const router = useRouter();
  const handleComment = () => {
    setSelectPost(entry);
    setIsModalOpen(true);
  };
  console.log(slug);
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
    router.push(`/legacy/${slug}/${id}`);
  };

  return (
    <Card>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-lg shadow-md aspect-[4/3]'
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
        <div className={cn('flex flex-col justify-center')}>
          <div className="flex items-center gap-2 mb-2">
            <time className="text-sm font-medium text-gray-500">
              {entry.date}
            </time>
            <span className="text-xl font-bold text-blue-600">
              {entry.year}
            </span>
          </div>

          <h2 className="text-xl xl:text-3xl font-bold text-gray-900 mb-3">
            {entry.title}
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {entry?.description?.slice(0, 150)}...
          </p>
          <div className="w-full flex items-center gap-3">
            <Button
              icon={<FaRegComment />}
              onClick={() => {
                setSelectPost(entry);
                handleComment();
              }}
              className="!w-full !text-white !bg-[#072A5E]"
            >
              Comment
            </Button>
            <Button
              onClick={() => handleClick(entry.title)}
              icon={<FaEye />}
              className="!w-full !text-white !bg-[#072A5E]"
            >
              View
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
            <div className="mb-6">
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
            </div>

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
    </Card>
  );
};

export default LegecyEntry;
