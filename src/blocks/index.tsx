import React from 'react';
import { z, ZodTypeAny } from 'zod';
import { Block as BlockBaseType, BlockType } from '../typings/page';
import { LinkBlock, LinkBlockEditor, linkSchema } from './link';
import { TextBlock, TextBlockEditor, textSchema } from './text';
import { YouTubeBlock, YouTubeBlockEditor, youtubeSchema } from './youtube';

export interface BlockProps<Data extends object> {
    data: Data,
    preview?: boolean;
};

export interface RendererProps<B extends BlockBaseType> {
    block: B;
    preview?: boolean;
};

export interface EditBlockProps<Data extends object> {
    id: string;
    initialData: Data;
    onSave: (id: string, data: Data) => void;
    onCancel: (id: string) => void;
};

export interface EditorProps<B extends BlockBaseType> {
    block: B;
    onSave: (id: string, data: B['data']) => void;
    onCancel: (id: string) => void;
};

const getFullSchema = <T extends ZodTypeAny>(type: BlockType, schema: T) => z.object({
    data: schema,
    type: z.enum([type]),
    id: z.string(),
});

export const blocksSchemas = z.union([
    getFullSchema('text', textSchema),
    getFullSchema('link', linkSchema),
    getFullSchema('youtube', youtubeSchema),
]).array();

export const blockAdapter = {
    text: {
        Editor: TextBlockEditor,
        Block: TextBlock,
        initialData: {
            text: 'Title',
            title: 'Text',
        }
    },
    link: {
        Editor: LinkBlockEditor,
        Block: LinkBlock,
        initialData: {
            text: 'Link',
            url: 'https://',
        }
    },
    youtube: {
        Editor: YouTubeBlockEditor,
        Block: YouTubeBlock,
        initialData: {
            url: '',
        },
    },
};

export const BlockEditor: React.FC<EditorProps<BlockBaseType>> = ({ block, ...props }) => {
    const { Editor } = React.useMemo(() => blockAdapter[block.type], [block.type]);

    // @ts-ignore
    return <Editor id={block.id} initialData={block.data} {...props} />;
};

export const BlockRenderer: React.FC<RendererProps<BlockBaseType>> = ({ block, ...props }) => {
    const { Block } = blockAdapter[block.type];

    // @ts-ignore
    return <Block data={block.data} {...props} />;
};
