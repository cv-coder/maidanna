<template>
    <div class="book-list-container">
        <div class="header">
            <h2 style="margin-right: auto">网上卖书平台</h2>
            <a-button type="primary" @click="handleAdd">添加书籍</a-button>
            <a-button v-if="hasSelected" type="primary" danger @click="handleBatchDelete" style="margin-left: 8px">
                批量删除
            </a-button>
        </div>

        <a-table :columns="columns" :data-source="books"
            :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" row-key="id"
            :pagination="{ pageSize: 5 }" :custom-row="customRow">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                    <div @click.stop>
                        <a-button type="link" @click="handleEdit(record)">编辑</a-button>
                        <a-popconfirm title="确定删除吗?" @confirm="handleDelete(record.id)">
                            <a-button type="link" danger>删除</a-button>
                        </a-popconfirm>
                    </div>
                </template>
                <template v-else-if="column.key === 'price'">
                    ¥{{ record.price }}
                </template>
            </template>
        </a-table>

        <BookForm v-model:open="formVisible" :book="currentBook" @submit="handleFormSubmit"
            @delete="handleFormDelete" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useBookStore } from '../stores/bookStore';
import BookForm from './BookForm.vue';
import type { Book } from '../types';

const bookStore = useBookStore();
const { books } = bookStore;

const columns = [
    {
        title: '书名',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: Book, b: Book) => a.name.localeCompare(b.name),
    },
    {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        sorter: (a: Book, b: Book) => a.price - b.price,
    },
    {
        title: '分类',
        dataIndex: 'category',
        key: 'category',
        filters: [
            { text: '技术', value: '技术' },
            { text: '小说', value: '小说' },
            { text: '历史', value: '历史' },
            { text: '其他', value: '其他' },
        ],
        onFilter: (value: string, record: Book) => record.category === value,
    },
    {
        title: '操作',
        key: 'action',
    },
];

const state = reactive<{
    selectedRowKeys: (string | number)[];
}>({
    selectedRowKeys: [],
});

const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    state.selectedRowKeys = selectedRowKeys;
};

const formVisible = ref(false);
const currentBook = ref<Book | undefined>(undefined);

const handleAdd = () => {
    currentBook.value = undefined;
    formVisible.value = true;
};

const handleEdit = (book: Book) => {
    currentBook.value = book;
    formVisible.value = true;
};

const handleDelete = (id: string) => {
    bookStore.removeBook(id);
};

const handleBatchDelete = () => {
    bookStore.removeBooks(state.selectedRowKeys as string[]);
    state.selectedRowKeys = [];
};

const handleFormSubmit = (book: Book | Omit<Book, 'id'>) => {
    if ('id' in book) {
        bookStore.updateBook(book as Book);
    } else {
        bookStore.addBook(book);
    }
    formVisible.value = false;
};

const handleFormDelete = (id: string) => {
    bookStore.removeBook(id);
    formVisible.value = false;
}

const customRow = (record: Book) => {
    return {
        onClick: () => {
            handleEdit(record);
        },
    };
};

</script>

<style scoped>
.header {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
}

.book-list-container {
    padding: 24px;
}
</style>
