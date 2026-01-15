<template>
    <a-modal :open="open" :title="isEdit ? '编辑书籍' : '新增书籍'" @ok="handleOk" @cancel="handleCancel" :footer="null">
        <a-form layout="vertical" :model="formState" name="bookForm">
            <a-form-item label="书名" name="name" :rules="[{ required: true, message: '请输入书名' }]">
                <a-input v-model:value="formState.name" />
            </a-form-item>
            <a-form-item label="价格" name="price" :rules="[{ required: true, message: '请输入价格' }]">
                <a-input-number v-model:value="formState.price" style="width: 100%" :min="0" />
            </a-form-item>
            <a-form-item label="分类" name="category" :rules="[{ required: true, message: '请输入分类' }]">
                <a-select v-model:value="formState.category">
                    <a-select-option value="技术">技术</a-select-option>
                    <a-select-option value="小说">小说</a-select-option>
                    <a-select-option value="历史">历史</a-select-option>
                    <a-select-option value="其他">其他</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="描述" name="description">
                <a-textarea v-model:value="formState.description" :rows="4" />
            </a-form-item>

            <div class="form-footer">
                <a-button @click="handleCancel" style="margin-right: 8px">取消</a-button>
                <a-button v-if="isEdit" danger @click="handleDelete" style="margin-right: 8px">删除</a-button>
                <a-button type="primary" html-type="submit" @click="handleOk">保存</a-button>
            </div>
        </a-form>
    </a-modal>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue';
import type { Book } from '../types';

const props = defineProps<{
    open: boolean;
    book?: Book;
}>();

const emit = defineEmits<{
    (e: 'update:open', open: boolean): void;
    (e: 'submit', book: Omit<Book, 'id'> | Book): void;
    (e: 'delete', id: string): void;
}>();

const formState = reactive({
    name: '',
    price: 0,
    category: '技术',
    description: ''
});

const isEdit = computed(() => !!props.book);

watch(() => props.open, (newOpen) => {
    if (newOpen) {
        if (props.book) {
            formState.name = props.book.name;
            formState.price = props.book.price;
            formState.category = props.book.category;
            formState.description = props.book.description;
        } else {
            formState.name = '';
            formState.price = 0;
            formState.category = '技术';
            formState.description = '';
        }
    }
});

const handleOk = () => {
    if (!formState.name || formState.price === null || formState.price === undefined || !formState.category) {
        return;
    }

    if (isEdit.value && props.book) {
        emit('submit', { ...props.book, ...formState });
    } else {
        emit('submit', { ...formState });
    }
};

const handleCancel = () => {
    emit('update:open', false);
};

const handleDelete = () => {
    if (props.book) {
        emit('delete', props.book.id);
    }
}
</script>

<style scoped>
.form-footer {
    text-align: right;
    margin-top: 24px;
}
</style>
