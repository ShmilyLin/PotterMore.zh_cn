//
//  PMNewsViewController.swift
//  PotterMore
//
//  Created by LinJia on 2020/3/18.
//  Copyright © 2020 linjia. All rights reserved.
//

import UIKit

class PMNewsViewController: UIViewController, UINavigationControllerDelegate, UITableViewDelegate, UITableViewDataSource, PMNavigationViewDelete {

    @IBOutlet weak var navigationView: PMNavigationView!
    
    @IBOutlet weak var tableView: UITableView!
    
    @IBOutlet weak var layoutConstraint_NavigationViewHeight: NSLayoutConstraint!
    
    var showState: Int = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if #available(iOS 13.0, *) {
            print("[PMNewsViewController] viewDidLoad", ((self.view.window ?? UIApplication.shared.windows.first)?.windowScene?.statusBarManager?.statusBarFrame.size.height ?? 20) + 40)
            self.layoutConstraint_NavigationViewHeight.constant = ((self.view.window ?? UIApplication.shared.windows.first)?.windowScene?.statusBarManager?.statusBarFrame.size.height ?? 20) + 40
        } else {
            self.layoutConstraint_NavigationViewHeight.constant = UIApplication.shared.statusBarFrame.size.height
        }
        
        self.navigationView.delegate = self;
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        self.navigationController?.delegate = self
    }
    
    override var preferredStatusBarStyle: UIStatusBarStyle {
        get {
            return UIStatusBarStyle.lightContent
        }
    }
    
    // MARK: - UITableViewDelegate
    func numberOfSections(in tableView: UITableView) -> Int {
        if self.showState == 0 {
            return 2
        }
        
        return 0
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if self.showState == 0 {
            switch section {
            case 0:
                return 1
            case 1:
                return 10
            default:
                return 0
            }
        }
        
        return 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var tempCell = tableView.dequeueReusableCell(withIdentifier: "UITableViewCell")
        if (tempCell == nil) {
            tempCell = UITableViewCell(style: .default, reuseIdentifier: "UITableViewCell")
        }
        
        return tempCell!
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 44
    }

    // MARK: - UINavigationControllerDelegate
    func navigationController(_ navigationController: UINavigationController, willShow viewController: UIViewController, animated: Bool) {
        if(viewController == self){
            navigationController.setNavigationBarHidden(true, animated: animated);
        }
    }
    
    // MARK: - PMNavigationViewDelete
    func navigationView(_ navigationView: PMNavigationView, buttonSelected index: Int) {
        if (self.showState != index) {
            if (index == 0) {
                
            } else if (index == 1) {
                
            }
            
            self.showState = index
        }
        
    }
}
