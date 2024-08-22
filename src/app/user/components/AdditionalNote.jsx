import React from 'react';

const AdditionalNote = React.memo(function AdditionalNoteComponent({ value, onChange }) {
    return (
        <>
        <label for="additional">Maladie: </label>
        <textarea
        id="additional"
        value={value}
        onChange={onChange}
        required
        className='w-full p-2 border rounded mt-3'
        placeholder='ex: Prefer afternoon, if possible'
        rows={4}
        />
        </>
    );
});

export default AdditionalNote;