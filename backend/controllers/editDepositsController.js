import Deposits from '../models/depositsModel.js';
import User from '../models/userModel.js';

export async function editDeposits(req, res) {
    try {
        const currentUser = await User.findByPk(req.body.user_id);

        if(currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can edit deposit entries." });
        }

        const editDeposits = await Deposits.update({
            particular: req.body.particular,
            date: req.body.date,
            amount: req.body.amount,
            remarks: req.body.remarks
        },
        {
            where: {
                deposit_id: req.body.deposit_id
            }
        }
    );

        res.status(201).json(editDeposits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while updating the entry."});
    }
}