import React, { useContext, useState, useEffect, useRef } from 'react';
import {Button, Input, InputNumber, Space, Table, Tag, Form} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          inputType,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;
    const inputNode = inputType === 'number' ? <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} /> : <Input type="date" ref={inputRef} onChange={save} onBlur={save} />;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                {inputNode}
                {/*<InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />*/}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

class DataTable extends React.Component {

    state = {
        searchText: '',
        searchedColumn: '',
        selectedRowKeys: [],
        count: 2,
        checkboxSelection: true,
        loading: true,
        column_choice: "calcul",
        select: true

    };

    static getDerivedStateFromProps(props){
        return ({
            dataSource: props.data,
            loading: props.loading,
            column_choice: props.choice,
            selectedRowKeys: props.index_selected,
            checkboxSelection: props.check,
            select: props.select
        })
    }

    onSelectChange = selectedRowKeys => {

        this.props.setSelection({selectedRowKeys})

    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    handleSave = (row) => {
        const updateData = [...this.state.dataSource];
        const selectedRowKeys = this.state.selectedRowKeys
        const index = updateData.findIndex((item) => row.key === item.key);
        const item = updateData[index];
        updateData.splice(index, 1, { ...item, ...row });

        this.props.setSelection({selectedRowKeys, updateData})
    };

    currencyTransform = (amount) => {
        return  <p> {new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'XAF' }).format(amount)} </p>
    }

    render() {

        const all_columns =  {
            "calcul": [
                {
                    title: 'Numéro de compte',
                    dataIndex: 'num_compte',
                    key: 'num_compte',
                    ...this.getColumnSearchProps('num_compte')
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
                    sorter: {
                        compare: (a, b) => a.solde_initial - b.solde_initial,
                        multiple: 2,
                    },
                    onCell: (record) => ({
                        record,
                        inputType: 'number',
                        editable: true,
                        dataIndex: 'solde_initial',
                        title: 'Solde initial',
                        handleSave: this.handleSave,
                    }),
                    render: solde => this.currencyTransform(solde),
                    // ...this.getColumnSearchProps('solde_initial')

                },
                {
                    title: 'Montant autorisation',
                    dataIndex: 'montant',
                    key: 'montant',
                    inputType: 'number',
                    sorter: {
                        compare: (a, b) => a.montant - b.montant,
                        multiple: 2,
                    },
                    onCell: (record) => ({
                        record,
                        inputType: 'number',
                        editable: true,
                        dataIndex: 'montant',
                        title: 'Montant autorisation',
                        handleSave: this.handleSave,
                    }),
                    render: montant => this.currencyTransform(montant),
                    // ...this.getColumnSearchProps('montant')

                },
                {
                    title: 'Début autorisation',
                    dataIndex: 'debut_autorisation',
                    key: 'debut_autorisation',
                    inputType: 'date',
                    sorter: {
                        compare: (a, b) => a.debut_autorisation - b.debut_autorisation,
                        multiple: 2,
                    },
                    render: deb => moment(deb).format('YYYY-MM-DD'),
                    onCell: (record) => ({
                        record,
                        inputType: 'date',
                        editable: true,
                        dataIndex: 'debut_autorisation',
                        title: 'Début autorisation',
                        handleSave: this.handleSave,
                    }),
                    // ...this.getColumnSearchProps('debut_autorisation')
                }
                ,
                {
                    title: 'Fin autorisation',
                    dataIndex: 'fin_autorisation',
                    key: 'fin_autorisation',
                    sorter: {
                        compare: (a, b) => a.fin_autorisation - b.fin_autorisation,
                        multiple: 2,
                    },
                    render: deb => moment(deb).format('YYYY-MM-DD'),
                    onCell: (record) => ({
                        record,
                        inputType: 'date',
                        editable: true,
                        dataIndex: 'fin_autorisation',
                        title: 'Fin autorisation',
                        handleSave: this.handleSave,
                    }),
                    // ...this.getColumnSearchProps('fin_autorisation')
                }
            ],
            "operations": [
                {
                    title: "Code Opération",
                    dataIndex: "code_operation",
                    key: "code_operation",
                    ...this.getColumnSearchProps("code_operation")
                },
                {
                    title: "Libellé Opération",
                    dataIndex: "libelle_operation",
                    key: "libelle_operation",
                    ...this.getColumnSearchProps("code_operation")
                },
            ],
            "accounts_recap": [
                {
                    title: 'Numéro de compte',
                    dataIndex: 'num_compte',
                    key: 'num_compte',
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
                    sorter: {
                        compare: (a, b) => a.solde_initial - b.solde_initial,
                        multiple: 2,
                    },
                    render: solde => this.currencyTransform(solde),

                },
                {
                    title: 'Montant autorisation',
                    dataIndex: 'montant',
                    key: 'montant',
                    sorter: {
                        compare: (a, b) => a.montant - b.montant,
                        multiple: 2,
                    },
                    render: montant => this.currencyTransform(montant),

                },
                {
                    title: 'Début autorisation',
                    dataIndex: 'debut_autorisation',
                    key: 'debut_autorisation',
                    inputType: 'date',
                    sorter: {
                        compare: (a, b) => a.debut_autorisation - b.debut_autorisation,
                        multiple: 2,
                    },
                    render: deb => moment(deb).format('YYYY-MM-DD'),
                },
                {
                    title: 'Fin autorisation',
                    dataIndex: 'fin_autorisation',
                    key: 'fin_autorisation',
                    sorter: {
                        compare: (a, b) => a.fin_autorisation - b.fin_autorisation,
                        multiple: 2,
                    },
                    render: deb => moment(deb).format('YYYY-MM-DD'),
                }
            ],
            "operations_recap": [
                {
                    title: "Code Opération",
                    dataIndex: "code_operation",
                    key: "code_operation",
                    ...this.getColumnSearchProps("code_operation")
                },
                {
                    title: "Libellé Opération",
                    dataIndex: "libelle_operation",
                    key: "libelle_operation",
                    ...this.getColumnSearchProps("code_operation")
                },
            ],
            "results": [
                {
                    title: "N° de Compte",
                    dataIndex: "N° de Compte",
                    key: "N° de Compte",
                    ...this.getColumnSearchProps("\"N° de Compte")
                },
                {
                    title: "Résultat calcul",
                    dataIndex: "Calcul",
                    key: "Calcul",
                    ...this.getColumnSearchProps("Calcul")
                },
                {
                    title: "Résultat journal",
                    dataIndex: "Journal",
                    key: "Journal",
                    ...this.getColumnSearchProps("Journal")
                },
                {
                    title: "Ecart",
                    dataIndex: "Ecart",
                    key: "Ecart",
                    ...this.getColumnSearchProps("Ecart")
                },
                {
                    title: "Date début arrêté",
                    dataIndex: "date_deb",
                    key: "date_deb",
                    ...this.getColumnSearchProps("date_deb")
                },
                {
                    title: "Date fin arrêté",
                    dataIndex: "date_fin",
                    key: "date_fin",
                    ...this.getColumnSearchProps("date_fin")
                }
            ],
            "calcul_epargne": [
                {
                    title: 'Numéro de compte',
                    dataIndex: 'num_compte',
                    key: 'num_compte',
                    ...this.getColumnSearchProps('num_compte')
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
                    sorter: {
                        compare: (a, b) => a.solde_initial - b.solde_initial,
                        multiple: 2,
                    },
                    onCell: (record) => ({
                        record,
                        inputType: 'number',
                        editable: true,
                        dataIndex: 'solde_initial',
                        title: 'Solde initial',
                        handleSave: this.handleSave,
                    }),
                    render: solde => this.currencyTransform(solde),

                },
            ],
            "accounts_recap_epargne": [
            {
                title: 'Numéro de compte',
                dataIndex: 'num_compte',
                key: 'num_compte',
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
                sorter: {
                    compare: (a, b) => a.solde_initial - b.solde_initial,
                    multiple: 2,
                },
                render: solde => this.currencyTransform(solde),

            },
        ]
        }

        const { selectedRowKeys, column_choice, loading, dataSource, select } = this.state;
        const rowSelection = select !== false ? {
            selectedRowKeys,
            onChange: this.onSelectChange,
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
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
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
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
            ],
        }:{
            selectedRowKeys: [],
            selections: []
        };

        const x = select !== false ? true : 1000

        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };

        return <Table title={() => this.props.title} loading={loading}  components={components} rowClassName={() => 'editable-row'} bordered rowSelection={rowSelection} columns={all_columns[column_choice]} dataSource={dataSource} pagination={{ pageSize: 100}} scroll={{ y: 240, x: x }}  />;
    }
}

export default DataTable;