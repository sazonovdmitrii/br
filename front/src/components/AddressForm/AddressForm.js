import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import Select from 'components/Select';
import Snackbar from 'components/Snackbar';

import styles from './styles.css';

const AddressForm = ({
    className,
    values: valuesProp,
    onSubmit,
    history,
    actions,
    // regions
}) => {
    // const regionsForSelect = regions.map(({ id, title }) => ({ id, value: title }));
    const [values, setValues] = useState({
        name: '',
        person: '',
        // region_id: null,
        city: '',
        street: '',
        zip: '',
        house: '',
        corp: '',
        level: '',
        flat: '',
        code: '',
        // comment: '',
        ...valuesProp,
    });
    const handleChange = ({ target: { name, value } }) => {
        setValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    // const handleChangeSelect = ({ id }) => {
    //     setValues(prevState => ({
    //         ...prevState,
    //         region_id: id,
    //     }));
    // };
    const handleSubmit = event => {
        event.preventDefault();

        onSubmit({
            variables: { input: values },
        });
    };
    const handleBackURL = () => {
        history.goBack();
    };

    const {
        city,
        street,
        zip,
        house,
        corp,
        level,
        flat,
        region_id,
        code,
        name,
        person,
        // comment,
    } = values;

    return (
        <form className={className} onSubmit={handleSubmit}>
            {/*<InputGroup>
                <Select
                    label="Регион*"
                    items={regionsForSelect}
                    value={region_id}
                    onChange={handleChangeSelect}
                />
            </InputGroup>*/}
            <InputGroup>
                <Input label="Город" name="city" value={city} onChange={handleChange} required />
            </InputGroup>
            <InputGroup>
                <Input label="Улица" name="street" value={street} onChange={handleChange} required />
            </InputGroup>
            <InputGroup>
                <Input label="Индекс" name="zip" value={zip} onChange={handleChange} required />
            </InputGroup>
            <InputGroup>
                <Input label="Дом" name="house" value={house} onChange={handleChange} required />
                <Input label="Офис/квартира" name="flat" value={flat} onChange={handleChange} required />
                <Input label="Домофон" name="code" value={code} onChange={handleChange} />
                <Input label="Корпус" name="corp" value={corp} onChange={handleChange} />
                <Input label="Этаж" name="level" value={level} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
                <Input label="Получатель" name="person" value={person} onChange={handleChange} />
                <Input label="Название адреса" name="name" value={name} onChange={handleChange} required />
                {/* <Input
                    label="Коментарий"
                    name="comment"
                    value={comment}
                    onChange={handleChange}
                    rowsMax="4"
                    multiline
                /> */}
            </InputGroup>
            <div className={styles.actions}>
                <Button type="submit" kind="primary" bold>
                    <FormattedMessage id="save_address" />
                </Button>
                {actions || (
                    <Button kind="secondary" onClick={handleBackURL} bold>
                        <FormattedMessage id="back" />
                    </Button>
                )}
            </div>
        </form>
    );
};

AddressForm.defaultProps = {};

AddressForm.propTypes = {};

export default AddressForm;
