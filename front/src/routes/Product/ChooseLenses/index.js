import React from 'react';

import { Dialog, DialogContent } from 'components/Dialog';

export default ({ onClose }) => {
    const handleCloseModal = () => {
        onClose();
    };
    return (
        <Dialog open={true} onClose={handleCloseModal} fullWidth>
            <DialogContent>test</DialogContent>
        </Dialog>
    );
};
