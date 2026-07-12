const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://hovfdvzcexwpmgiujolf.supabase.co',
  'sb_publishable_kGLQg_nfixaNksRpICDuUQ_15VZodGt' // Anon key from .env.local
)

async function testRpc() {
  const { data, error } = await supabase.rpc('book_appointment', {
    p_barbershop_id: 'a87a718c-c2b4-4e78-8317-09d30043c8a9', // fake or real
    p_service_id: 'a87a718c-c2b4-4e78-8317-09d30043c8a9',
    p_barber_id: 'a87a718c-c2b4-4e78-8317-09d30043c8a9',
    p_first_name: 'Test',
    p_last_name: 'User',
    p_phone: '+1234567890',
    p_start_time: new Date().toISOString(),
    p_end_time: new Date(Date.now() + 3600000).toISOString(),
    p_price: 150
  })

  console.log("RPC Result:", data)
  console.log("RPC Error:", error)
}

testRpc()
