import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, InputNumber, Tag, Popconfirm, Form, Typography, Space, Button, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <DatePicker />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const DataTable = (parentProps) => {
    const realData = parentProps.data
    const checkBox = parentProps.check
    const choice = parentProps.choice
    const selected = parentProps.index_selected
    const load = parentProps.loading

    const [selectionModel, setSelectionModel] = React.useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [searchedColumn, setSearchedColumn] = React.useState({});
    const [searchText, setSearchText] = React.useState('');
    const [trueData, setTrueData] = React.useState([]);
    const [loading, setLoading] = React.useState(true)
    const [checKboxSelection, setChecKboxSelection] = React.useState(true)
    const [column_choice, setColumn_choice] = React.useState("calcul")

    // Set default
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    React.useEffect(
        () => {
            setTrueData(realData)
            setChecKboxSelection(checkBox)
            setColumn_choice(choice)
            setLoading(load)
            setSelectionModel(selected)
        }, [realData, checkBox, choice, load, selected, parentProps]
    )

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            num_compte: '',
            type_account: '',
            solde_initial: '',
            montant: '',
            debut_autorisation: '',
            fin_autorisation: '',

            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Numéro de compte',
            dataIndex: 'num_compte',
            key: 'num_compte',
            editable: true
        },
        {
            title: 'Type',
            dataIndex: 'type_compte',
            key: 'type_compte',
            render: tag => (
                <>
                    <Tag color="volcano" key={tag}>
                        {tag.toUpperCase()}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Solde initial',
            dataIndex: 'solde_initial',
            key: 'solde_initial',
            editable: true,
            render: solde => this.currencyTransform(solde),
            // ...this.getColumnSearchProps('solde_initial')

        },
        {
            title: 'Montant autorisation',
            dataIndex: 'montant',
            key: 'montant',
            editable: true,
            render: montant => this.currencyTransform(montant),
            // ...this.getColumnSearchProps('montant')

        },
        {
            title: 'Début autorisation',
            dataIndex: 'debut_autorisation',
            key: 'debut_autorisation',
            editable: true,
            render: deb => moment(deb).format('YYYY-MM-DD'),

        },
        {
            title: 'Fin autorisation',
            dataIndex: 'fin_autorisation',
            key: 'fin_autorisation',
            editable: true,
            render: deb => moment(deb).format('YYYY-MM-DD'),
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            fixed: 'right',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{
                    marginRight: 8,
                }}
            >
              Enregistrer
            </a>
            <Popconfirm title="Etes vous sûr ?" onConfirm={cancel}>
              <a>Annuler</a>
            </Popconfirm>
          </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Modifier
                    </Typography.Link>
                );
            },
        },
    ];

    const all_columns =  {
        "calcul": [
            {
                title: 'Numéro de compte',
                dataIndex: 'num_compte',
                key: 'num_compte',
                // ...this.getColumnSearchProps('num_compte')
            },
            {
                title: 'Type',
                dataIndex: 'type_compte',
                key: 'type_compte',
                render: tag => (
                    <>
                        <Tag color="volcano" key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    </>
                ),
            },
            {
                title: 'Solde initial',
                dataIndex: 'solde_initial',
                key: 'solde_initial',
                onCell: (record) => ({
                    record,
                    inputType: 'number',
                    dataIndex: 'solde_initial',
                    title: 'Solde initial',
                    editing: true,
                }),
                render: solde => this.currencyTransform(solde),
                // ...this.getColumnSearchProps('solde_initial')

            },
            {
                title: 'Montant autorisation',
                dataIndex: 'montant',
                key: 'montant',
                onCell: (record) => ({
                    record,
                    inputType: 'number',
                    dataIndex: 'montant',
                    title: 'Montant autorisation',
                    editing: true,
                }),
                render: montant => this.currencyTransform(montant),
                // ...this.getColumnSearchProps('montant')

            },
            {
                title: 'Début autorisation',
                dataIndex: 'debut_autorisation',
                key: 'debut_autorisation',
                render: deb => moment(deb).format('YYYY-MM-DD'),
                onCell: (record) => ({
                    record,
                    inputType: 'date',
                    dataIndex: 'debut_autorisation',
                    title: 'Début autorisation',
                    editing: true,
                }),
            }
            ,
            {
                title: 'Fin autorisation',
                dataIndex: 'fin_autorisation',
                key: 'fin_autorisation',
                render: deb => moment(deb).format('YYYY-MM-DD'),
                onCell: (record) => ({
                    record,
                    inputType: 'date',
                    dataIndex: 'fin_autorisation',
                    title: 'Fin autorisation',
                    editing: true,
                }),
                // ...this.getColumnSearchProps('fin_autorisation')
            }
        ],
        "results": [],
        "operations": [],
        "accounts_recap": [],
        "operations_recap": []
    }
    // const mergedColumns = all_columns[column_choice].map((col) => {
    //
    //     const numbersFiels = ['solde_initial', 'montant']
    //     if (!col.editable) {
    //         return col;
    //     }
    //
    //     return {
    //         ...col,
    //         onCell: (record) => ({
    //             record,
    //             inputType: numbersFiels.includes(col.dataIndex) ? 'number' : 'date',
    //             dataIndex: col.dataIndex,
    //             title: col.title,
    //             editing: isEditing(record),
    //         }),
    //     };
    // });

    const onSelectChange = selectedRowKeys => {

        // const updateData = this.state.dataSource
        // // Update selected, send data to Parent component
        // this.setState({ selectedRowKeys });


        this.props.setSelection({selectedRowKeys})

    };

    const rowSelection = {
        selectionModel,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectionModel(newSelectedRowKeys)
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    selectionModel(newSelectedRowKeys)
                },
            },
        ],
    };

    return (
        <Form form={form} component={false}>
            <Table
                loading={loading}
                rowClassName={() => 'editable-row'}
                rowSelection={rowSelection}
                dataSource={trueData}
                columns={all_columns[column_choice]}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                pagination={{
                    // onChange: cancel,
                    pageSize: 500
                }}
                bordered
                scroll={{ y: 240 }}
            />
        </Form>
    );
};