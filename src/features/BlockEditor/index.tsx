import React from 'react';
import dynamic from 'next/dynamic';
import { v4 as uuidv4 } from 'uuid';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import { blockAdapter, BlockEditor as Editor } from '../../blocks';
import { Block } from '../../typings/page';
import { Button } from '../../components/Button';
import { Stack } from '../../components/Stack';
import { useTranslation } from 'next-i18next';
import { Space } from '../../components/Space';
import { LinkIcon, MenuAlt2Icon } from '@heroicons/react/solid';
import { ModalTitle } from '../../components/Modal';
import { Empty } from './components/Empty';

const Modal = dynamic(() => import('../../components/Modal/Modal'), { ssr: false });
const BlockItem = dynamic(() => import('./components/BlockItem'), { ssr: false });

interface Props {
    blocks: Block[];
    onChange: (blocks: Block[]) => void;
}

const getBlocks = (blocks: Block[]) => blocks.reduce<Record<string, Block>>((dict, block) => {
    dict[block.id] = block;
    return dict;
}, {});

const getOrder = (blocks: Block[]) => blocks.map(({ id }) => id);

export const BlockEditor: React.FC<Props> = (props) => {
    const { blocks: initialBlocks, onChange } = props;
    const { t } = useTranslation('common');
    const [blocks, setBlocks] = React.useState(getBlocks(initialBlocks));
    const [order, setOrder] = React.useState(getOrder(initialBlocks));

    const [modal, setModal] = React.useState(false);
    const [isNew, setIsNew] = React.useState(false);
    const [selected, setSelected] = React.useState('');

    const openModal = React.useCallback((id: string, created?: boolean) => {
        setSelected(id);
        setIsNew(Boolean(created));
        setModal(true);
    }, []);

    const closeModal = React.useCallback(() => setModal(false), []);

    const items = React.useMemo(() => order.map((id) => blocks[id]), [order, blocks]);

    React.useEffect(() => onChange(items), [items, onChange]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const addBlock = React.useCallback((type: Block['type']) => {
        setBlocks(v => {
            const id = uuidv4() + Object.keys(v).length;
            setOrder(v => [...v, id]);
            openModal(id, true);
            const block = {
                id,
                type,
                data: blockAdapter[type].initialData,
            } as Block;
            return {
                ...v,
                [id]: block
            };
        });
    }, [openModal]);

    const updateBlock = React.useCallback((id: string, data: Block['data']) => {
        closeModal();
        setBlocks(v => ({
            ...v,
            [id]: ({
                ...v[id],
                data,
            }) as Block,
        }));
    }, [closeModal]);

    const removeBlock = React.useCallback((id: string) => {
        closeModal();
        setBlocks(v => {
            const result = { ...v };
            delete result[id];
            return result;
        });
        setOrder(v => {
            const result = [...v];
            result.splice(result.indexOf(id), 1);
            return result;
        });
    }, [closeModal]);

    const handleDragEnd = React.useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            return;
        }

        if (active.id !== over.id) {
            setOrder((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);

                return arrayMove(items, oldIndex, newIndex);
            });
        };
    }, []);

    const onCancel = React.useCallback((id: string) => {
        if (isNew) {
            return removeBlock(id);
        }
        closeModal();
    }, [isNew, removeBlock, closeModal]);

    const renderEditor = React.useCallback((id: string) => {
        const block = blocks[id];
        if (!block) {
            return null;
        }
        return (
            <>
                <ModalTitle>{t(`b.${block.type}`)}</ModalTitle>
                <Editor
                    block={block}
                    onSave={updateBlock}
                    onCancel={onCancel}
                />
            </>
        );
    }, [blocks, onCancel, updateBlock, t]);

    // TODO 
    const addBlockText = React.useCallback(() => addBlock('text'), [addBlock]);
    const addBlockLink = React.useCallback(() => addBlock('link'), [addBlock]);
    const addBlockYouTube = React.useCallback(() => addBlock('youtube'), [addBlock]);

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            >
                <SortableContext
                    items={order}
                    strategy={verticalListSortingStrategy}
                >
                    <Stack direction="column" gap={8}>
                        {items.length ? items.map((block) => (
                            <BlockItem
                                key={block.id}
                                block={block}
                                onEdit={openModal}
                                onRemove={removeBlock}
                            />
                        )) : (
                            <Empty />
                        )}
                    </Stack>
                </SortableContext>
            </DndContext>
            <Space size={16} />
            <Stack gap={8} wrap>
                <Button icon={<MenuAlt2Icon />} onClick={addBlockText}>{t('b.text')}</Button>
                <Button icon={<LinkIcon />} onClick={addBlockLink}>{t('b.link')}</Button>
                <Button icon="youtube" onClick={addBlockYouTube}>{t('b.youtube')}</Button>
            </Stack>
            <Modal
                open={modal}
                maxWidth="md"
            >
                {selected ? renderEditor(selected) : null}
            </Modal>
        </>
    );
};
