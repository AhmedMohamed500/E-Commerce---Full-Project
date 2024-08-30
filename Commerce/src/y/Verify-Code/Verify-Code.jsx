

export default function VerifyCode() {
    
  return (
    <>
    <div className="container mx-auto py-12">
<form>
    
    <div className="mb-6">
      <h3 className="font-bold text-2xl mb-2">please enter your verification code</h3>
      <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Code" required />
      <button className="bg-white font-bold text-green-400 p-2 border-2 border-green-400 mt-2 rounded-lg">Verify</button>
  </div>
</form>
</div>
    </>
  )
}
