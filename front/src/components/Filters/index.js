import React, { useState } from 'react';
import classnames from 'classnames/bind';
import { Filter as FilterIcon, Search as SearchIcon, X as CloseIcon } from 'react-feather';

import { Tabs, Tab, TabsView } from 'components/Tabs';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Filters = ({ list }) => {
    const [{ value, active }, setState] = useState({
        value: null,
        active: false,
    });

    const handleChange = newValue => {
        setState(prevState => ({
            ...prevState,
            value: value === newValue ? null : newValue,
            active: value !== newValue,
        }));
    };
    const handleChangeFilter = () => {};

    const tabWrapperClassName = cx(styles.tabWrapper, { active });
    const innerClassName = cx(styles.inner, { active });
    const wrapperClassName = cx(styles.wrapper, { expanded: active });
    const modalClassName = cx(styles.modal, { expanded: active });
    const tabsClassName = cx(styles.tabs, { expanded: active });
    const buttonsClassName = cx(styles.buttons, { expanded: active });

    return (
        <div className={wrapperClassName}>
            <div className={modalClassName}>
                <h2 className={styles.modalHeader}>Filter frame selection</h2>
                <button
                    type="button"
                    className={styles.modalClose}
                    onClick={() => setState({ value: null, active: false })}
                >
                    <CloseIcon />
                </button>
                <div className={styles.modalFooter}>
                    <span className="c-gallery-filters__clear-filters -disabled">Clear filters (0)</span>
                    <Button className={styles.modalButton} kind="simple">
                        See 90 frames
                    </Button>
                </div>
            </div>
            <div className={innerClassName}>
                {list.length ? (
                    <Tabs className={tabsClassName} value={value} onChange={handleChange}>
                        {list.map(item => {
                            if (!item.childrens.length) return null;
                            const tabClassName = cx(styles.tab, {
                                active: value ? value === item.id : true,
                                inactive: value !== item.id,
                            });

                            return (
                                <Tab
                                    key={item.id}
                                    className={tabClassName}
                                    value={item.id}
                                    data-name={item.name}
                                >
                                    {item.name}
                                </Tab>
                            );
                        })}
                    </Tabs>
                ) : null}
                {list.length ? (
                    <div className={tabWrapperClassName}>
                        {list.map(item => {
                            if (!item.childrens.length) return null;

                            const tabContentClassName = cx(styles.tabContent, {
                                active: item.id === value,
                            });

                            return (
                                <TabsView key={item.id} value={value} className={tabContentClassName}>
                                    <div className={styles.tabContentItems}>
                                        {item.childrens.map(({ name, id }) => {
                                            if (!name) return null;

                                            return (
                                                <div key={id} className={styles.filterItem}>
                                                    <Checkbox
                                                        label={name}
                                                        name={id}
                                                        onChange={handleChangeFilter}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </TabsView>
                            );
                        })}
                    </div>
                ) : null}
            </div>
            <div className={buttonsClassName}>
                <Button
                    className={styles.button}
                    kind="simple"
                    onClick={() => setState({ active: true, value: list[0].id })}
                >
                    <FilterIcon size="15" className={styles.buttonIcon} />
                    Filter frames
                </Button>
                <Button className={styles.button} kind="simple">
                    <SearchIcon size="15" className={styles.buttonIcon} />
                    Search frames
                </Button>
            </div>
        </div>
    );
};

export default Filters;
