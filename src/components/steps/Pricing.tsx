'use client';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { CreateAccountProps } from './create-account';

export default function Pricing({ onContinue }: CreateAccountProps) {
  const tiers = [
    {
      name: 'Free',
      id: 'tier-basic',
      href: '#',
      priceMonths: '$0',
      duration: '3 month subscription',
      description:
        'Perfect for individuals or small projects just getting started.',
      features: [
        '5 products',
        'Up to 2,500 subscribers',
        'Basic analytics',
        '48-hour support response time',
      ],
      color: 'bg-gradient-to-br from-[#7898C9] to-gray-50',
      buttonColor:
        'bg-white text-blue-600 border border-blue-200 hover:border-blue-300 hover:bg-blue-50',
      textColor: 'text-gray-700',
    },
    {
      name: 'Standard',
      id: 'tier-standard',
      href: '#',
      priceMonths: '$147',
      duration: '6 month subscription',
      description:
        'Everything you need for growing businesses and professional teams.',
      features: [
        'Unlimited products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Custom reporting',
        'API access',
      ],
      color: 'bg-gradient-to-br from-blue-600 to-indigo-700',
      buttonColor: 'bg-white text-indigo-700 hover:bg-gray-50',
      textColor: '!text-white',
    },
    {
      name: 'Premium',
      id: 'tier-premium',
      href: '#',
      priceMonths: '$297',
      duration: '6 month subscription',
      description: 'Dedicated support and infrastructure for your company.',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Premium analytics',
        'Dedicated support representative',
        'Marketing automations',
        'Custom integrations',
        'SLA guarantee',
      ],
      color: 'bg-gradient-to-br from-blue-50 to-[#7898C9]',
      buttonColor:
        'bg-white text-blue-600 border border-blue-200 hover:border-blue-300 hover:bg-blue-50',
      textColor: 'text-gray-700',
    },
  ];

  return (
    <div className="flex-1 !w-full">
      {/* Gentle background elements */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute opacity-10 -top-40 -right-40 h-96 w-96 rounded-full bg-blue-100"></div>
        <div className="absolute opacity-10 bottom-0 left-20 h-64 w-64 rounded-full bg-purple-100"></div>
        <div className="absolute opacity-5 top-1/4 left-1/3 h-80 w-80 rounded-full bg-pink-100"></div>
      </div>

      <div className="">
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                'relative rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md',
                tier.color
              )}
            >
              <div className="p-8">
                <h3 className={cn('text-xl font-medium', tier.textColor)}>
                  {tier.name}
                </h3>

                <p className={cn('mt-4 text-sm', tier.textColor)}>
                  {tier.description}
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className={cn('text-4xl font-light', tier.textColor)}>
                    {tier.priceMonths}
                  </span>
                </div>
                <small className={cn('text-2xl font-light', tier.textColor)}>
                  {tier.duration}
                </small>

                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle
                        className={cn(
                          'mr-3 h-5 w-5 flex-shrink-0',
                          tier.textColor
                        )}
                      />
                      <span className={cn('text-sm', tier.textColor)}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {tier.name === 'Free' ? (
                    <button
                      onClick={() => onContinue()}
                      className={cn(
                        'block w-full rounded-lg py-3 px-4 text-center text-sm font-medium transition-colors duration-200',
                        tier.buttonColor
                      )}
                    >
                      Get started
                    </button>
                  ) : (
                    <Link
                      href={tier.href}
                      className={cn(
                        'block w-full rounded-lg py-3 px-4 text-center text-sm font-medium transition-colors duration-200',
                        tier.buttonColor
                      )}
                    >
                      Get started
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
