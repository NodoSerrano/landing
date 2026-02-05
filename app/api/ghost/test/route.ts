import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ghostUrl = process.env.NEXT_PUBLIC_GHOST_URL || 'https://blog.nodoserrano.org';
    const apiKey = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Ghost API key not configured' },
        { status: 500 }
      );
    }

    // Test Ghost Content API connection
    const apiUrl = `${ghostUrl}/ghost/api/content/posts/?key=${apiKey}&limit=1`;

    console.log('[Ghost Test] Testing connection to:', ghostUrl);
    console.log('[Ghost Test] API Key:', apiKey.substring(0, 10) + '...');

    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Ghost Test] Error:', response.status, errorText);
      return NextResponse.json(
        {
          error: `Ghost API error: ${response.status} ${response.statusText}`,
          details: errorText
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Ghost API connection successful',
      ghostUrl,
      postsFound: data.posts?.length || 0,
      samplePost: data.posts?.[0]?.title || 'No posts found'
    });

  } catch (error) {
    console.error('[Ghost Test] Exception:', error);
    return NextResponse.json(
      {
        error: 'Failed to test Ghost API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
