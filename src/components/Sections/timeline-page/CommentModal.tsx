import { imageUrl } from '@/lib/server';
import {
  Avatar,
  Button,
  Empty,
  Form,
  FormInstance,
  Input,
  List,
  Spin,
} from 'antd';
import Image from 'next/image';
import React, { memo } from 'react';
import { IoSend } from 'react-icons/io5';
import { useGetCommentQuery } from '@/app/provider/Redux/service/timelineApis';
interface CommentModalProps {
  selectPost: any;
  form: FormInstance;
  handleSubmit: (values: { description: string }) => void;
  isCommentLoading: boolean;
}

function CommentModal({
  selectPost,
  form,
  handleSubmit,
  isCommentLoading,
}: CommentModalProps) {
  const { data, isLoading } = useGetCommentQuery(
    { id: selectPost?._id },
    { skip: !selectPost?._id }
  );
  return (
    <div>
      <div className="mb-6">
        <div>
          <Image
            src={selectPost?.img || '/placeholder.svg'}
            alt={selectPost?.title}
            width={400}
            height={400}
            className="w-full h-[400px] object-cover mt-4"
          />
          <h4 className="font-bold">{selectPost?.title}</h4>
          <p>
            {selectPost?.date} | {selectPost?.year}
          </p>
          <p dangerouslySetInnerHTML={{ __html: selectPost?.description }} />
        </div>
      </div>

      <Spin spinning={isLoading}>
        <div className="mb-6 overflow-y-scroll max-h-[300px]">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          {data?.data?.length === 0 ? (
            <Empty description={'No Comment in this post'} />
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={data?.data}
              renderItem={(comment: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="circle"
                        size={24}
                        src={imageUrl(comment?.userId?.img)}
                        className="rounded-md"
                      />
                    }
                    title={
                      <div className="flex items-center gap-2">
                        <span className="font-bold">
                          {comment?.userId?.fullName}
                        </span>
                      </div>
                    }
                    description={
                      <div className="line-clamp-2 text-sm text-gray-600">
                        {comment?.description}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </div>

        <div className="border-t pt-4">
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item
              name="description"
              rules={[{ required: true, message: 'Please enter your comment' }]}
            >
              <Input.TextArea rows={4} placeholder="Leave a comment..." />
            </Form.Item>
            <Form.Item className="mb-0 text-right">
              <Button
                icon={<IoSend />}
                className="!w-full !bg-[#072A5E] hover:!bg-[#7898C9] !text-white hover:!text-black"
                htmlType="submit"
              >
                {isCommentLoading ? 'Posting...' : 'Post Comment'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </div>
  );
}

export default memo(CommentModal);
