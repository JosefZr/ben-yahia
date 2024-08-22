import React from 'react';

const Note = React.memo(function NoteComponent({ value, onChange }) {
  return (
    <>
    <label for="note">Reason for appointment:</label>
    <textarea
      id="note"
      value={value}
      onChange={onChange}
      className='w-full p-2 border rounded my-3'
      required
      placeholder='ex: Annual mothly chack-up'
      rows={4}
    />
    </>
  );
});

export default Note;