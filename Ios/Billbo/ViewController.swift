//
//  ViewController.swift
//  Billbo
//
//  Created by Cheryl Zhang on 15/11/6.
//  Copyright © 2015年 Cheryl Zhang. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    
    @IBOutlet weak var webview: UIWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        let url = NSURL(string:"http://ch3rylz.com/2015Fall/617/try/6");
        let requestObj = NSURLRequest(URL:url!);
        webview.loadRequest(requestObj);
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

