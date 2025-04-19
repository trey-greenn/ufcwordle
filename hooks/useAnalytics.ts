import { useRouter } from 'next/router';
import { useEffect } from 'react';

type EventParams = Record<string, string | number | boolean>;

/**
 * Hook for tracking Google Analytics events
 * @returns Object with tracking functions
 */
export function useAnalytics() {
  const router = useRouter();
  
  // Track page views when the route changes
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (window.gtag) {
        window.gtag('config', 'G-R4H7303MTZ', {
          page_path: url,
        });
      }
    };
    
    // When the component is mounted, track page view
    handleRouteChange(router.asPath);
    
    // When the route changes, track page view
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.asPath, router.events]);
  
  /**
   * Track a custom event
   * @param action - The action or event name
   * @param category - Event category
   * @param label - Event label
   * @param params - Additional parameters
   */
  const trackEvent = (
    action: string,
    category?: string,
    label?: string,
    params?: EventParams
  ) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        ...params,
      });
    }
  };
  
  return { trackEvent };
}

// Make sure to add TypeScript definition for gtag in a declaration file
// Create a file called gtag.d.ts in your project root or types folder:
/*
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, any> | Date
    ) => void;
    dataLayer: any[];
  }
}

export {};
*/ 