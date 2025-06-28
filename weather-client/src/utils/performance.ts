// Performance monitoring utility
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Track API response times
  trackApiCall(endpoint: string, duration: number) {
    if (!this.metrics.has(endpoint)) {
      this.metrics.set(endpoint, []);
    }
    this.metrics.get(endpoint)!.push(duration);
    
    // Keep only last 100 measurements
    const measurements = this.metrics.get(endpoint)!;
    if (measurements.length > 100) {
      measurements.shift();
    }
  }

  // Get average response time for an endpoint
  getAverageResponseTime(endpoint: string): number {
    const measurements = this.metrics.get(endpoint);
    if (!measurements || measurements.length === 0) return 0;
    
    const sum = measurements.reduce((acc: number, val: number) => acc + val, 0);
    return sum / measurements.length;
  }

  // Get performance stats
  getStats() {
    const stats: Record<string, any> = {};
    
    Array.from(this.metrics.entries()).forEach(([endpoint, measurements]) => {
      if (measurements.length > 0) {
        const avg = measurements.reduce((acc: number, val: number) => acc + val, 0) / measurements.length;
        const min = Math.min(...measurements);
        const max = Math.max(...measurements);
        
        stats[endpoint] = {
          average: avg.toFixed(2),
          min: min.toFixed(2),
          max: max.toFixed(2),
          count: measurements.length
        };
      }
    });
    
    return stats;
  }

  // Clear all metrics
  clear() {
    this.metrics.clear();
  }
}

// Performance optimization utilities
export const performanceUtils = {
  // Debounce function calls
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function calls
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Measure execution time
  measureTime<T>(fn: () => T, label: string): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${label} took ${(end - start).toFixed(2)}ms`);
    return result;
  },

  // Check if element is in viewport
  isInViewport(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Intersection Observer for lazy loading
  createIntersectionObserver(
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver {
    return new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });
  }
};

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance(); 