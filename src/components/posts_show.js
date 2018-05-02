import React from 'react';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import autobind from 'react-autobind';

class PostsShow extends React.Component {
constructor(props){
    super(props);
    autobind(this);

    //const { id } = this.props.match.params;
}
componentDidMount() {
    if (!this.props.post){
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
    }
}
onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
        this.props.history.push('/');
    });
}

render() {
    const { post } = this.props;
    if(!post) {
        return <div>Loading...</div>
    }
    //console.log(post);
    return (
        <div>
            <div className='text-xs-right btn-toolbar'>
           <Link className='btn btn-primary' to='/'>
            Back
            </Link>
            <button className="btn btn-danger" onClick={this.onDeleteClick}>
            Delete Post
            </button>
            </div>
           <h3>{post.title}</h3>
           <h6>Categories: {post.categories}</h6>
           <p>Description: {post.content}</p>
        </div>
        
    );
    }
}
const mapStateToProps = ({posts}, ownProps) => {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);