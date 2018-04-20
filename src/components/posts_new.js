import React from 'react';
import { Field , reduxForm } from 'redux-form';

class PostsNew extends React.Component {
    renderTitleField(field){
        return (
            <div className='form-group'>
                <label>Title</label>
                <input className='form-control'
                type='text'
                {...field.input}
                />
            </div>
        )
    }


    renderField(field){
        return (
            <div className='form-group'>
                <label>{field.label}</label>
                <input className='form-control'
                type='text'
                {...field.input}
                />
                {field.meta.errors}
            </div>
        )
    }
    render(){
        return (
            <form>
            <Field
            label='Title'
            name='title'
            component = {this.renderField}
            />
            <Field
            label='Categories'
            name='categories'
            component = {this.renderField}
            />
            <Field
            label='Post Content'
            name='content'
            component = {this.renderField}
            />
            </form>

        );
    }
}

const validate= (values) => {
    const errors ={};

if(!values.title){
    errors.title="Enter a title!"
}

if(!values.categories){
    errors.categories="Enter a category!"
}

if(!values.content){
    errors.content="Enter some content!"
}

    return errors;

}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(PostsNew);