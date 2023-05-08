import React, { FC, ReactElement } from 'react';
import { render, RenderOptions, renderHook } from '@testing-library/react';
import { Toaster } from 'react-hot-toast';
import { TRPCTestClientProvider } from './TRPCTestClientProvider';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => (
  <TRPCTestClientProvider>
    {children}
    <Toaster />
  </TRPCTestClientProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, { wrapper: AllTheProviders, ...options });
const customRenderHook = (callback: () => any, options?: Omit<RenderOptions, 'wrapper'>) => renderHook(callback, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
export { customRenderHook as renderHook };