//
//  PMNavigationView.swift
//  PotterMore
//
//  Created by LinJia on 2020/3/18.
//  Copyright © 2020 linjia. All rights reserved.
//

import UIKit

protocol PMNavigationViewDelete {
    func navigationView(_ navigationView: PMNavigationView, buttonSelected index: Int)
}

class PMNavigationView: UIView {
    
    var delegate: PMNavigationViewDelete?
    
    lazy var newsButton: UIButton = {
        let tempButton = UIButton(type: UIButton.ButtonType.custom)
        tempButton.translatesAutoresizingMaskIntoConstraints = false
        tempButton.setTitle("新闻", for: .normal)
        tempButton.setTitleColor(UIColor(red: 204.0/255.0, green: 204.0/255.0, blue: 204.0/255.0, alpha: 0.6), for: .normal)
        tempButton.setTitleColor(UIColor.white, for: .selected)
        tempButton.addTarget(self, action: #selector(newsButtonClickEvent(sender:)), for: .touchUpInside)
        return tempButton;
    }()
    
    lazy var featuresButton: UIButton = {
        let tempButton = UIButton(type: UIButton.ButtonType.custom)
        tempButton.translatesAutoresizingMaskIntoConstraints = false
        tempButton.setTitle("功能", for: .normal)
        tempButton.setTitleColor(UIColor(red: 204.0/255.0, green: 204.0/255.0, blue: 204.0/255.0, alpha: 0.6), for: .normal)
        tempButton.setTitleColor(UIColor.white, for: .selected)
        tempButton.addTarget(self, action: #selector(featuresButtonClickEvent(sender:)), for: .touchUpInside)
        return tempButton;
    }()

    override func awakeFromNib() {
        super.awakeFromNib()
        
        print("[PMNavigationView] awakeFromNib")
        
        self.backgroundColor = UIColor(red: 30/255.0, green: 30/255.0, blue: 30/255.0, alpha: 1.0);
        
        // newsButton
        self.addSubview(self.newsButton)
        self.addConstraint(NSLayoutConstraint(item: self.newsButton, attribute: .left, relatedBy: .equal, toItem: self, attribute: .left, multiplier: 1.0, constant: 0.0))
        self.addConstraint(NSLayoutConstraint(item: self.newsButton, attribute: .bottom, relatedBy: .equal, toItem: self, attribute: .bottom, multiplier: 1.0, constant: 0.0))
        self.addConstraint(NSLayoutConstraint(item: self.newsButton, attribute: .right, relatedBy: .equal, toItem: self, attribute: .centerX, multiplier: 1.0, constant: 0.0))
        self.addConstraint(NSLayoutConstraint(item: self.newsButton, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1.0, constant: 44.0))
        self.newsButton.isSelected = true
        
        // featuresButton
        self.addSubview(self.featuresButton)
        self.addConstraint(NSLayoutConstraint(item: self.featuresButton, attribute: .right, relatedBy: .equal, toItem: self, attribute: .right, multiplier: 1.0, constant: 0.0))
        self.addConstraint(NSLayoutConstraint(item: self.featuresButton, attribute: .bottom, relatedBy: .equal, toItem: self, attribute: .bottom, multiplier: 1.0, constant: 0.0))
        self.addConstraint(NSLayoutConstraint(item: self.featuresButton, attribute: .left, relatedBy: .equal, toItem: self, attribute: .centerX, multiplier: 1.0, constant: 0.0))
        self.addConstraint(NSLayoutConstraint(item: self.featuresButton, attribute: .height, relatedBy: .equal, toItem: nil, attribute: .notAnAttribute, multiplier: 1.0, constant: 44.0))
    }

    // MARK: - Click
    @objc func newsButtonClickEvent(sender: UIButton) {
        self.newsButton.isSelected = true
        self.featuresButton.isSelected = false
        if self.delegate != nil {
            self.delegate?.navigationView(self, buttonSelected: 0)
        }
    }
    
    @objc func featuresButtonClickEvent(sender: UIButton) {
        self.newsButton.isSelected = false
        self.featuresButton.isSelected = true
        if self.delegate != nil {
            self.delegate?.navigationView(self, buttonSelected: 1)
        }
    }
}
