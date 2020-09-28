import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function Search ({ updateInputValue, submitSearchValue, history }){
//console.log(updateInputValue);

return(
  <form
    onSubmit={(e) => {
      e.preventDefault();
      history.push('/');
      submitSearchValue({ currentPage: 1 });
    }}
  >
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search by name"
        type="text"
        onChange={evt => updateInputValue(evt)}
      />
      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          type="submit"
        >
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  </form>
)
}

export default Search;
