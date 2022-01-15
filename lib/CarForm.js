export default function carForm() {

  const handleSubmit = async(event) => {
    // prevent page from refreshing on submit
    event.preventDefault();

    // normally to convert form event to json, you have to access each individual property, which leads to ugly/tedious code
    // better approach is to convert event target to form data class, which is built in browser
    // FormData() organizes form fields into key value pairs
    const form = new FormData(event.target);
    // convert form to plan JS object using .fromEntries()
    const formData = Object.fromEntries(form.entries());
    console.log('this is formData:', formData);

    const res = await fetch('/api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    console.log('stored as JSON in redisdb as ID value:', result);
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        {/* make sure name matches redis schema */}
        <p>make </p>
        <input name='make' type='text' />

        <p>model</p>
        <input name='model' type='text' />

        <p>image </p>
        <input name='image' type='text' />

        <p>year </p>
        <input name='year' type='text' />

        <p>description</p>
        <textarea name='description' type='text' />

        <p></p>
        <button type='submit'>Create Car</button>
      </form>
    </div>
  );
}
