import { Breadcrumb } from 'antd';
import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <div className="mt-28">
      <Head>
        <title>About Us</title>
      </Head>
      <main className="container mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-4">
          <Breadcrumb
            items={[
              {
                title: <Link href="/">Home</Link>,
              },
              {
                title: <Link href="">terms-&-condition</Link>,
              },
            ]}
          />
        </nav>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Terms & Condition</h1>
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
