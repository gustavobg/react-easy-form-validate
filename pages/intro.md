# Page Title

> Some lead text (a blockquote, optional)

Introductory text

## A Title

Some description.

- A bullet point list
- with
- some
- items

```react
state: {values: { first_name: 'John', last_name: '' }}
---
<div>
    <Form
        values={state.values}
        validate={(values) => {
             const err = {};
             const {
                first_name,
                last_name,
              } = values;

              if (first_name === '') {
                err.first_name = 'First name required';
              }

              if (last_name === '') {
                err.last_name = 'Last name required';
              }

              return err;
            }
        }
        onSubmitSuccess={() => {
            alert('Success, form will be sent, all fields are valids!');
        }}
        onSubmitError={(errors) => {
            console.log('Ops, some errors', errors);
        }}
    >
    {(form) => (
        <div>
            First Name <br />
            <input name="first_name" type="text" value={form.input.first_name} onChange={form.handleChange} />
            <span style={{ color: 'red' }}>{form.errors.first_name}</span>
            <br />
            Last Name <br />
            <input name="last_name" type="text" value={form.input.last_name} onChange={form.handleChange} />
            <span style={{ color: 'red' }}>{form.errors.last_name}</span>
            <br /><br />
            <button onClick={form.handleSubmit}>Save values</button>
        </div>
    )}
    </Form>
</div>
```