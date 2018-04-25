import React from 'react';
import { Field , reduxForm } from 'redux-form';
import autobind from 'react-autobind';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends React.Component {
constructor(props){
    super(props);
    autobind(this);
}
    renderField(field){
        const { meta : { touched , error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className='form-control'
                type='text'
                {...field.input}
                />
                <div className="text-help">
                {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values){
        this.props.createPost(values, () => {
            this.props.history.push('/');
            }
        );
    }

    render(){
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
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
            <div className="btn-toolbar">
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link className='btn btn-danger' to='/'>
            Cancel
            </Link>
            </div>
            </form>
    
        );
    }
}

const validate = (values) => {
    const errors = {};

if(!values.title){
    errors.title="Enter a title!";
}

if(!values.categories){
    errors.categories="Enter a category!";
}

if(!values.content){
    errors.content="Enter some content!";
}

    return errors;

}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})( connect(null, { createPost } ) ( PostsNew ));