import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    outline: 1px solid #e0e5f2;
    padding: 5px;
    .demo-editor {
        background: cornsilk;
        padding: 10px;
    }
    .rdw-emoji-wrapper {
        display: none;
    }
`;


const EditorConvertToHTML = ({ html, onChangeHTML } : { html: string, onChangeHTML: void }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        if (html) {
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState))
        }
    }, []);


    const onEditorStateChange = (value: string) => {
        onChangeHTML(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        setEditorState(value);
    };

    return (
        <Wrapper>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
            {/*<textarea*/}
            {/*    disabled*/}
            {/*    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
            {/*/>*/}
        </Wrapper>
    )

}

export default EditorConvertToHTML;