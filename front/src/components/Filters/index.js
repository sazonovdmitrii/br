import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames/bind';
import { Filter as FilterIcon, X as CloseIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { isBrowser } from 'utils';

import { Tabs, Tab, TabsView } from 'components/Tabs';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Filters = ({ list, count, onChange }) => {
    const [tab, setTab] = useState({
        value: null,
        active: false,
    });
    const [tagsIds, setTagsIds] = useState([]);
    const overlayNode = useRef(null);
    const [tablet, setTablet] = useState(isBrowser ? window.innerWidth < 768 : false);

    if (isBrowser) {
        window.matchMedia('(max-width: 768px)').addListener(() => {
            setTablet(window.innerWidth < 768);
        });
    }

    useEffect(() => {
        const domNode = document.body;

        if (tablet && tab.active) {
            if (window.innerWidth !== overlayNode.current.clientWidth) {
                domNode.style.paddingRight = '15px';
            }
            domNode.style.overflow = 'hidden';
        }

        return () => {
            domNode.style = null;
        };
    }, [tab.active, tablet]);
    const handleChangeTab = (newValue) => {
        setTab((prevState) => ({
            ...prevState,
            value: tab.value === newValue ? null : newValue,
            active: tab.value !== newValue,
        }));
    };
    const handleChangeFilter = (tagId, active) => {
        setTagsIds((prevState) => {
            const newTagsIds = active ? [...prevState, tagId] : prevState.filter((id) => id !== tagId);
            onChange(newTagsIds);

            return newTagsIds;
        });
    };
    const handleClose = () => {
        setTab({ value: null, active: false });
    };
    const resetFilters = () => {
        setTagsIds([]);
        onChange([]);
    };

    const tabWrapperClassName = cx(styles.tabWrapper, { active: tab.active });
    const innerClassName = cx(styles.inner, { active: tab.active });
    const wrapperClassName = cx(styles.wrapper, { expanded: tab.active });
    const modalClassName = cx(styles.modal, { expanded: tab.active });
    const modalFooterClassName = cx(styles.modalFooter, { expanded: tab.active });
    const tabsClassName = cx(styles.tabs, { expanded: tab.active });
    const buttonsClassName = cx(styles.buttons, { expanded: tab.active });

    return (
        <div ref={overlayNode} className={wrapperClassName}>
            <div className={modalClassName}>
                <h2 className={styles.modalHeader}>
                    <FormattedMessage id="p_catalog_filters_modal_header" />
                </h2>
                <button
                    type="button"
                    className={styles.modalClose}
                    onClick={() => setTab({ value: null, active: false })}
                >
                    <CloseIcon />
                </button>
            </div>
            <div className={innerClassName}>
                {list.length ? (
                    <Tabs className={tabsClassName} value={tab.value} onChange={handleChangeTab}>
                        {list.map((item) => {
                            if (!item.childrens.length) return null;

                            const tabClassName = cx(styles.tab, {
                                active: tab.value ? tab.value === item.id : true,
                                inactive: tab.value !== item.id,
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
                        {list.map((item) => {
                            if (!item.childrens.length) return null;

                            const tabContentClassName = cx(styles.tabContent, {
                                active: item.id === tab.value,
                            });

                            return (
                                <TabsView key={item.id} value={tab.value} className={tabContentClassName}>
                                    <div className={styles.tabContentItems}>
                                        {item.childrens.map(({ name, id }) => {
                                            if (!name) return null;

                                            return (
                                                <div key={id} className={styles.filterItem}>
                                                    <Checkbox
                                                        label={name}
                                                        name={id}
                                                        onChange={(e, value) => handleChangeFilter(id, value)}
                                                        checked={tagsIds.indexOf(id) !== -1}
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
            <div className={modalFooterClassName}>
                <Button className={styles.modalButton} onClick={handleClose} kind="simple">
                    <FormattedMessage id="p_catalog_filters_modal_button" values={{ count }} />
                </Button>
                <button type="button" className={styles.resetButton} onClick={resetFilters}>
                    <FormattedMessage
                        id="p_catalog_filters_modal_reset_button"
                        values={{ count: tagsIds.length }}
                    />
                </button>
            </div>
            <div className={buttonsClassName}>
                <Button
                    className={styles.button}
                    kind="simple"
                    onClick={() => setTab({ active: true, value: list[0].id })}
                >
                    <FilterIcon size="15" className={styles.buttonIcon} />
                    <FormattedMessage id="p_catalog_filters_button" />
                </Button>
                {/* <Button className={styles.button} kind="simple">
                    <SearchIcon size="15" className={styles.buttonIcon} />
                    Search frames
                </Button> */}
            </div>
        </div>
    );
};

export default Filters;
