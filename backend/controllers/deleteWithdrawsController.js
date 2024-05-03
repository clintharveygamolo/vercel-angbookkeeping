import Withdraws from '../models/withdrawsModel.js';
import User from '../models/userModel.js';

export async function deleteWithdraws(req, res) {
    try {
        const currentUser = await User.findByPk(req.body.user_id);

        const { withdraw_id } = req.body;

        const withdraws = await Withdraws.findOne({ where: { withdraw_id: withdraw_id } });

        if (currentUser.role !== 'Admin') {
            return res.status(403).json({ error: "Forbidden: Only admin users can delete withdrawal entries." });
        }

        if (!withdraws) {
            return res.status(401).json({ message: "Deletion failed, withdraw entry not found." });
        }

        await Withdraws.destroy({
            where: {
                withdraw_id: req.body.withdraw_id
            }
        }
        );

        res.status(201).json("Deletion success, withdrawal entry has been deleted.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occured while deleting the entry." });
    }
}