import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DotsVerticalIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { BlockRenderer } from '../../../../blocks';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { Handle } from '../../../../components/Handle';
import { Menu, MenuItemWithIcon } from '../../../../components/Menu';
import { Text } from '../../../../components/Typography';
import { useDraggableCursor } from '../../../../utils/hooks/useDraggableCursor';
import { Block } from '../../../../typings/page';

import cls from './BlockItem.module.scss';

interface Props {
    block: Block;
    onRemove: (id: string) => void;
    onEdit: (id: string) => void;
}

export const BlockItem: React.FC<Props> = ({ block, onEdit, onRemove }) => {
    const { t } = useTranslation('common');
    const { id } = block;
    const {
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
        setNodeRef,
        setActivatorNodeRef,
    } = useSortable({
        id,
        transition: {
            duration: 150,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        }
    });

    useDraggableCursor(isDragging);

    const style = React.useMemo(() => ({
        transform: CSS.Transform.toString(transform ? {
            ...transform,
            scaleY: 1,
        } : null),
        transition,
    }), [transform, transition]);

    const edit = React.useCallback(() => onEdit(id), [onEdit, id]);
    const remove = React.useCallback(() => onRemove(id), [onRemove, id]);

    return (
        <Card
            left={
                <Handle
                    {...listeners}
                    {...attributes}
                    ref={setActivatorNodeRef}
                />
            }
            menu={(
                <Menu
                    align="end"
                    withArrow={false}
                    content={(
                        <>
                            <MenuItemWithIcon
                                icon={<Pencil2Icon />}
                                onClick={edit}
                            >
                                {t('edit')}
                            </MenuItemWithIcon>
                            <MenuItemWithIcon
                                icon={<TrashIcon />}
                                onClick={remove}
                            >
                                {t('remove')}
                            </MenuItemWithIcon>
                        </>
                    )}
                >
                    <Button variant="ghost" icon={<DotsVerticalIcon />} />
                </Menu>
            )}
            ref={setNodeRef}
            className={clsx(cls.root, { [cls.isDragging]: isDragging })}
            style={style}
        >
            <Text type="secondary" size="xs">{t(`b.${block.type}`)}</Text>
            <BlockRenderer block={block} preview />
        </Card>
    );
};

export default BlockItem;
