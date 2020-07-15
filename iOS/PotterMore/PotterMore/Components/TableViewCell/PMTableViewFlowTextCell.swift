//
//  PMTableViewFlowTextCell.swift
//  PotterMore
//
//  Created by LinJia on 2020/3/19.
//  Copyright © 2020 linjia. All rights reserved.
//

import UIKit

class PMTableViewFlowTextCell: UITableViewCell {
    
    @IBOutlet weak var flowTitleLabel: UILabel!
    
    @IBOutlet weak var flowAuthorLabel: UILabel!
    
    @IBOutlet weak var flowDescLabel: UILabel!

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
