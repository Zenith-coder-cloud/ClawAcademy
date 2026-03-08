'use client';

import { useEffect, useRef } from 'react';

export default function TelegramLoginButton() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'ClawAcademyBot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-auth-url', `${window.location.origin}/login`);
    script.setAttribute('data-radius', '12');
    script.async = true;

    container.innerHTML = '';
    container.appendChild(script);

    return () => { container.innerHTML = ''; };
  }, []);

  return (
    <div
      ref={widgetRef}
      className='w-full flex items-center justify-center py-1'
      aria-label='Telegram login'
    />
  );
}
