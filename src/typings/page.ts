import { Page as PageBase, User } from '@prisma/client';
import { LinkBlockType } from '../blocks/link';
import { TextBlockType } from '../blocks/text';
import { YouTubeBlockType } from '../blocks/youtube';

export interface BlockBase {
    id: string;
}

export type Page = Omit<PageBase, 'blocks'> & {
    blocks: Block[];
};

export type PageWithUser = Page & {
    user: User;
}

export type Block = TextBlockType | LinkBlockType | YouTubeBlockType;

export type BlockType = Block['type'];
