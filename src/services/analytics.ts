import { prisma } from '@/lib/prisma';

export const analyticsService = {
  async trackPageView(userId: string, page: string) {
    await prisma.pageView.create({
      data: {
        userId,
        page,
        timestamp: new Date()
      }
    });
  },

  async trackEvent(userId: string, eventName: string, metadata: any) {
    await prisma.event.create({
      data: {
        userId,
        eventName,
        metadata,
        timestamp: new Date()
      }
    });
  },

  async getAnalytics(timeframe: string) {
    const startDate = getStartDate(timeframe);
    
    const [sales, pageViews, events] = await Promise.all([
      prisma.order.groupBy({
        by: ['createdAt'],
        where: {
          createdAt: {
            gte: startDate
          }
        },
        _sum: {
          total: true
        }
      }),
      prisma.pageView.groupBy({
        by: ['page'],
        where: {
          timestamp: {
            gte: startDate
          }
        },
        _count: true
      }),
      prisma.event.findMany({
        where: {
          timestamp: {
            gte: startDate
          }
        }
      })
    ]);

    return {
      sales,
      pageViews,
      events
    };
  }
};

function getStartDate(timeframe: string): Date {
  const now = new Date();
  switch (timeframe) {
    case 'day':
      return new Date(now.setDate(now.getDate() - 1));
    case 'week':
      return new Date(now.setDate(now.getDate() - 7));
    case 'month':
      return new Date(now.setMonth(now.getMonth() - 1));
    case 'year':
      return new Date(now.setFullYear(now.getFullYear() - 1));
    default:
      return new Date(now.setDate(now.getDate() - 7));
  }
} 