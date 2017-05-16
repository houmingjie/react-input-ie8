import React, { Component } from 'react'

class Input extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: props.value,
        };

        this.onComposition = false;
        this.handleComposition = this.handleComposition.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.valueChange = this.valueChange.bind(this);
    }

    valueChange(value){
        let {onChange} = this.props;
        onChange&&onChange(value);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({value: nextProps.value});
        }
    }

    handleComposition(e) {
        let type = e.type;
        if (type === 'compositionend') {
            this.onComposition = false
            this.handleChange(this.state.value);
        } else if(type === 'compositionstart'|| type === 'compositionupdate'){//React 14.X版本的input在ie8下keyup,keydown也会触发composition事件
            this.onComposition = true
        }
    }

    handleChange(value) {
        this.setState({value: value},() => {
            if (this.onComposition) return;
            this.valueChange(value);
        })
    }

    render() {
        const { tagName, refc,...other,} = this.props;
        const Tag = tagName;
        return (
            <Tag
                {...other}
                onCompositionStart={this.handleComposition}
                onCompositionUpdate={this.handleComposition}
                onCompositionEnd={this.handleComposition}
                ref={c => {
                  refc(c)
                  return c
                }}
                onChange={(e) => {
                  this.handleChange(e.target.value)
                }}
                value={this.state.value}
                ></Tag>
        )
    }
}

Input.defaultProps = {
    tagName: 'input',
    type: 'text',
    value: '',
    onChange: function (value) {
    },
    refc: function (c) {
    },
};

export default Input;