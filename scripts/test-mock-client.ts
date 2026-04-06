import { createClientComponentClient } from '../src/lib/supabase/client';

// Mock window and process for the test
(global as any).window = {};
(global as any).process = { env: { PLAYWRIGHT_TEST: 'true' } };

async function testMock() {
  console.log('Testing createClientComponentClient mock...');
  const supabase = createClientComponentClient();
  
  console.log('Case 1: Direct await on select()');
  try {
    const { data, error } = await supabase.from('test').select('*');
    console.log('Data count:', data?.length);
    console.log('First project title:', data?.[0]?.title);
    if (data && data.length > 0 && data[0].title === 'Mock Project E2E') {
      console.log('✅ Await test passed!');
    } else {
      console.log('❌ Await test failed! Data:', data);
    }
  } catch (e) {
    console.error('❌ Await test crashed:', e);
  }

  console.log('\nCase 2: Chained query then await');
  try {
    const { data } = await supabase.from('test').select('*').eq('id', 1).order('id');
    if (data && data.length > 0) {
      console.log('✅ Chained test passed!');
    } else {
      console.log('❌ Chained test failed!');
    }
  } catch (e) {
    console.error('❌ Chained test crashed:', e);
  }
}

testMock();
