import { Metadata } from 'next';
import { JSX } from 'react';

export type PageProps = {
  params: {
    id?: string;
    slug?: string;
  };
};

export type PageFunction = (props: PageProps) => JSX.Element;

export type PageWithMetadata = {
  default: PageFunction;
  generateMetadata?: (props: PageProps) => Promise<Metadata>;
};
