import { NextApiRequest, NextApiResponse } from 'next';
import { analyticsService } from '@/services/analytics';
import { authMiddleware } from '@/middleware/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { timeframe = 'week' } = req.query;
    const analytics = await analyticsService.getAnalytics(timeframe as string);
    res.status(200).json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default authMiddleware(handler); 