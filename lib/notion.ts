import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const DATABASE_ID = (process.env.NOTION_DATABASE_ID || '').trim();

export type Course = {
  id: string;
  title: string;
  status: string;
  tracks: string[];
  facilitatorName: string;
  facilitatorBio: string;
  dates: string;
  location: string;
  tuition: string;
  capacity: number | null;
  summary: string;
  applicationLink: string;
};

export async function getPublishedCourses(): Promise<Course[]> {
  if (!DATABASE_ID || !process.env.NOTION_API_KEY) {
    console.warn('NOTION_DATABASE_ID or NOTION_API_KEY is not defined.');
    return [];
  }
  
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending'
        }
      ]
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props.Name?.title?.[0]?.plain_text || 'Untitled Course',
        status: props.Status?.select?.name || 'Draft',
        tracks: props.Track?.multi_select?.map((t: any) => t.name) || [],
        facilitatorName: props['Facilitator Name']?.rich_text?.[0]?.plain_text || '',
        facilitatorBio: props['Facilitator Bio']?.rich_text?.[0]?.plain_text || '',
        dates: props['Dates & Cadence']?.rich_text?.[0]?.plain_text || '',
        location: props.Location?.select?.name || '',
        tuition: props['Tuition Model']?.rich_text?.[0]?.plain_text || '',
        capacity: props.Capacity?.number || null,
        summary: props['Course Summary']?.rich_text?.[0]?.plain_text || '',
        applicationLink: props['Application Link']?.url || '',
      };
    });
  } catch (error) {
    console.error('Failed to fetch courses from Notion:', error);
    return [];
  }
}
