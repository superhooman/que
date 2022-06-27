import React from 'react';
import { blockAdapter, BlockRenderer as Renderer } from '../../blocks';
import { Stack } from '../../components/Stack';
import { Block } from '../../typings/page';

interface Props {
    blocks: Block[];
}

export const BlockRenderer: React.FC<Props> = ({ blocks }) => (
    <Stack direction="column" gap={16}>
        {blocks.map((block) => {
            return (
                <Renderer
                    key={block.id}
                    block={block}
                />
            );
        })}
    </Stack>
);
