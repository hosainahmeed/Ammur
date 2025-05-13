import DynamicHeader from '@/components/share/DynamicHeader';
import { Breadcrumb } from 'antd';;
import Link from 'next/link';

export default function About() {
  return (
    <div>
      <DynamicHeader title="About us" />
      <main className="container mx-auto px-4 py-28">
        <nav className="text-sm text-gray-500 mb-4">
          <Breadcrumb
            items={[
              {
                title: <Link href="/">Home</Link>,
              },
              {
                title: <Link href="/about">about-us</Link>,
              },
            ]}
          />
        </nav>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">About us</h1>
        <section className="space-y-6 text-gray-700 md:text-xl leading-relaxed">
          {[...Array(3)].map((_, i) => (
            <p key={i}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn&lsquo;t anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words etc.
            </p>
          ))}
        </section>
      </main>
    </div>
  );
}
